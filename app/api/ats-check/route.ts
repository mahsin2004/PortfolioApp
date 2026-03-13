import { NextRequest, NextResponse } from "next/server";
import { inflateRawSync, inflateSync } from "zlib";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ATSResult {
  overall: number;
  grade: "A+" | "A" | "B+" | "B" | "C" | "D" | "F";
  gradeLabel: string;
  summary: string;
  categories: {
    label: string;
    score: number;
    icon: string;
    details: string[];
  }[];
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: { type: "error" | "warning" | "success"; text: string }[];
}

// ─── Manual PDF Parser ────────────────────────────────────────────────────────
/**
 * Extracts text from a PDF buffer without any third-party library.
 *
 * Strategy:
 *  1. Locate every "stream ... endstream" block in the raw bytes.
 *  2. For each stream, read the stream dictionary to detect /Filter
 *     (FlateDecode = zlib/deflate, or uncompressed).
 *  3. Inflate compressed streams with Node's built-in zlib.
 *  4. Scan the decoded bytes for PDF text-showing operators:
 *       (Hello) Tj          — show literal string
 *       [(He)(llo)] TJ      — show array of strings
 *       <48656c6c6f> Tj     — hex string
 *  5. Collect all strings and join them.
 *
 * Limitations (acceptable for ATS resume text):
 *  • Does not handle LZW, ASCII85, or other rare filters.
 *  • Does not reconstruct reading order across columns.
 *  • Encrypted PDFs will yield garbled / empty text.
 */
function extractFromPdf(buffer: Buffer): string {
  const bytes = buffer;
  const text = bytes.toString("latin1"); // latin1 is byte-safe (0x00–0xFF)

  const parts: string[] = [];

  // ── helper: decode a PDF literal string  (...)  handling escapes ──
  function decodeLiteral(raw: string): string {
    let result = "";
    let i = 0;
    while (i < raw.length) {
      if (raw[i] === "\\") {
        i++;
        switch (raw[i]) {
          case "n":  result += "\n"; break;
          case "r":  result += "\r"; break;
          case "t":  result += "\t"; break;
          case "b":  result += "\b"; break;
          case "f":  result += "\f"; break;
          case "(":  result += "(";  break;
          case ")":  result += ")";  break;
          case "\\": result += "\\"; break;
          default:
            // octal escape \ddd
            if (/[0-7]/.test(raw[i])) {
              let octal = raw[i];
              if (i + 1 < raw.length && /[0-7]/.test(raw[i + 1])) { octal += raw[++i]; }
              if (i + 1 < raw.length && /[0-7]/.test(raw[i + 1])) { octal += raw[++i]; }
              result += String.fromCharCode(parseInt(octal, 8));
            } else {
              result += raw[i];
            }
        }
      } else {
        result += raw[i];
      }
      i++;
    }
    return result;
  }

  // ── helper: decode a PDF hex string  <4865...> ──
  function decodeHex(hex: string): string {
    const h = hex.replace(/\s/g, "");
    let result = "";
    for (let i = 0; i < h.length; i += 2) {
      result += String.fromCharCode(parseInt(h.slice(i, i + 2), 16));
    }
    return result;
  }

  // ── helper: extract text operators from decoded stream content ──
  function extractTextFromContent(content: string): string {
    const collected: string[] = [];

    // Match all PDF string objects: (literal) or <hex>
    // We look for them followed by Tj/TJ/Td context by scanning the content
    // for BT...ET blocks first (text blocks), then fall back to full scan.
    const btBlocks = [...content.matchAll(/BT([\s\S]*?)ET/g)].map(m => m[1]);
    const sources = btBlocks.length > 0 ? btBlocks : [content];

    for (const src of sources) {
      // Tj: single string
      // (string) Tj
      for (const m of src.matchAll(/\(([^)\\]*(?:\\.[^)\\]*)*)\)\s*Tj/g)) {
        collected.push(decodeLiteral(m[1]));
      }
      // TJ: array of strings/numbers
      // [(str1) -200 (str2)] TJ
      for (const m of src.matchAll(/\[([\s\S]*?)\]\s*TJ/g)) {
        const inner = m[1];
        for (const sm of inner.matchAll(/\(([^)\\]*(?:\\.[^)\\]*)*)\)/g)) {
          collected.push(decodeLiteral(sm[1]));
        }
        // hex strings inside TJ arrays
        for (const hm of inner.matchAll(/<([0-9a-fA-F\s]+)>/g)) {
          collected.push(decodeHex(hm[1]));
        }
      }
      // Hex Tj: <hex> Tj
      for (const m of src.matchAll(/<([0-9a-fA-F\s]+)>\s*Tj/g)) {
        collected.push(decodeHex(m[1]));
      }
    }

    return collected.join(" ");
  }

  // ── locate all stream...endstream sections ──
  let pos = 0;
  while (pos < text.length) {
    const streamStart = text.indexOf("stream", pos);
    if (streamStart === -1) break;

    // The stream dictionary precedes the "stream" keyword — find the matching "obj" block
    const dictEnd = streamStart;
    // find the newline/CRLF after "stream"
    let dataStart = streamStart + 6; // skip "stream"
    if (text[dataStart] === "\r") dataStart++;
    if (text[dataStart] === "\n") dataStart++;

    const streamEndToken = text.indexOf("endstream", dataStart);
    if (streamEndToken === -1) { pos = streamStart + 6; continue; }

    // extract the raw stream bytes
    const rawStream = bytes.subarray(dataStart, streamEndToken);

    // look backward for the dictionary to find /Filter and /Length
    const dictSearchStart = Math.max(0, streamStart - 2000);
    const dictChunk = text.slice(dictSearchStart, streamStart);

    // detect filter
    const filterMatch = dictChunk.match(/\/Filter\s*\/(\w+)/);
    const filterArrayMatch = dictChunk.match(/\/Filter\s*\[([^\]]+)\]/);
    const filters: string[] = [];
    if (filterArrayMatch) {
      filters.push(...filterArrayMatch[1].match(/\/\w+/g)?.map(f => f.slice(1)) ?? []);
    } else if (filterMatch) {
      filters.push(filterMatch[1]);
    }

    let decoded: Buffer = rawStream as Buffer;
    try {
      for (const filter of filters) {
        if (filter === "FlateDecode" || filter === "Fl") {
          try {
            decoded = inflateSync(decoded);
          } catch {
            decoded = inflateRawSync(decoded);
          }
        }
        // ASCIIHexDecode
        else if (filter === "ASCIIHexDecode" || filter === "AHx") {
          const hex = decoded.toString("ascii").replace(/\s/g, "").replace(/>$/, "");
          decoded = Buffer.from(hex, "hex");
        }
        // ASCII85 and others: skip (uncommon in resumes)
      }
    } catch {
      // decompression failed — skip this stream
      pos = streamEndToken + 9;
      continue;
    }

    const content = decoded.toString("latin1");
    const extracted = extractTextFromContent(content);
    if (extracted.trim()) parts.push(extracted);

    pos = streamEndToken + 9;
  }

  // Clean up: collapse whitespace, remove lone control chars
  return parts
    .join("\n")
    .replace(/[^\x09\x0A\x0D\x20-\xFF]/g, " ")
    .replace(/ {2,}/g, " ")
    .trim();
}

// ─── Manual DOCX Parser ───────────────────────────────────────────────────────
/**
 * Extracts text from a DOCX buffer without any third-party library.
 *
 * A .docx file is simply a ZIP archive. Inside it, word/document.xml holds
 * the document body. We:
 *  1. Parse the ZIP directory manually using Node's built-in zlib (unzipSync
 *     handles the per-entry deflate, but we need to locate entries ourselves).
 *  2. Find the "word/document.xml" entry and decompress it.
 *  3. Strip all XML tags, decode XML entities, and return plain text.
 *
 * This covers 99 %+ of real-world .docx resumes.
 */
function extractFromDocx(buffer: Buffer): string {
  // ── ZIP parsing ──
  // Local file entry signature: PK\x03\x04
  // Central directory signature: PK\x01\x02
  // End of central directory: PK\x05\x06

  function readUInt16LE(buf: Buffer, off: number) { return buf.readUInt16LE(off); }
  function readUInt32LE(buf: Buffer, off: number) { return buf.readUInt32LE(off); }

  const ZIP_LOCAL_SIG   = 0x04034b50;
  const ZIP_CENTRAL_SIG = 0x02014b50;

  // Walk local file entries
  const entries: Map<string, Buffer> = new Map();
  let offset = 0;

  while (offset < buffer.length - 4) {
    const sig = readUInt32LE(buffer, offset);

    if (sig === ZIP_LOCAL_SIG) {
      const compression      = readUInt16LE(buffer, offset + 8);
      const compressedSize   = readUInt32LE(buffer, offset + 18);
      const fileNameLen      = readUInt16LE(buffer, offset + 26);
      const extraLen         = readUInt16LE(buffer, offset + 28);
      const fileNameBytes    = buffer.subarray(offset + 30, offset + 30 + fileNameLen);
      const fileName         = fileNameBytes.toString("utf8");
      const dataOffset       = offset + 30 + fileNameLen + extraLen;
      const compressedData   = buffer.subarray(dataOffset, dataOffset + compressedSize);

      let fileData: Buffer;
      if (compression === 0) {
        // Stored (no compression)
        fileData = compressedData as Buffer;
      } else if (compression === 8) {
        // Deflated
        try {
          fileData = inflateRawSync(compressedData);
        } catch {
          fileData = Buffer.alloc(0);
        }
      } else {
        fileData = Buffer.alloc(0);
      }

      entries.set(fileName, fileData);
      offset = dataOffset + compressedSize;
    } else if (sig === ZIP_CENTRAL_SIG) {
      // Central directory — we're done with local entries
      break;
    } else {
      // Unknown bytes — advance one byte to resync
      offset++;
    }
  }

  // ── Find word/document.xml ──
  const docXml =
    entries.get("word/document.xml") ??
    // some tools use slightly different casing
    [...entries.entries()].find(([k]) => k.toLowerCase() === "word/document.xml")?.[1];

  if (!docXml) {
    throw new Error("word/document.xml not found in DOCX archive");
  }

  const xml = docXml.toString("utf8");

  // ── Strip XML and decode entities ──
  // Insert spaces between paragraph/run tags so words don't merge
  const spaced = xml
    .replace(/<\/w:p>/gi, "\n")          // paragraph end → newline
    .replace(/<\/w:r>/gi, " ")           // run end → space
    .replace(/<[^>]+>/g, "");            // strip all remaining tags

  return spaced
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ─── Gemini Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) resume analyst with deep knowledge of hiring practices, ATS algorithms, and resume optimization.

Analyze the provided resume text and return a detailed, accurate ATS analysis in strict JSON format. Be honest but constructive.

Return ONLY valid JSON (no markdown, no code fences, no extra text) matching this exact schema:
{
  "overall": <integer 0-100>,
  "grade": <"A+" | "A" | "B+" | "B" | "C" | "D" | "F">,
  "gradeLabel": <"Excellent" | "Great" | "Good" | "Average" | "Below Average" | "Poor" | "Very Poor">,
  "summary": <2-3 sentence overall assessment string>,
  "categories": [
    {
      "label": "Keyword Match",
      "score": <integer 0-100>,
      "icon": "🎯",
      "details": [<2-4 specific detail strings>]
    },
    {
      "label": "Resume Structure",
      "score": <integer 0-100>,
      "icon": "📋",
      "details": [<2-4 specific detail strings>]
    },
    {
      "label": "Impact & Metrics",
      "score": <integer 0-100>,
      "icon": "⚡",
      "details": [<2-4 specific detail strings>]
    },
    {
      "label": "Formatting & Length",
      "score": <integer 0-100>,
      "icon": "📐",
      "details": [<2-4 specific detail strings>]
    },
    {
      "label": "ATS Compatibility",
      "score": <integer 0-100>,
      "icon": "🤖",
      "details": [<2-4 specific detail strings>]
    }
  ],
  "matchedKeywords": [<array of strings: relevant skills/technologies found in resume, max 20>],
  "missingKeywords": [<array of strings: important skills/technologies NOT found but relevant to the role (if job description provided), max 12>],
  "suggestions": [
    { "type": <"error" | "warning" | "success">, "text": <actionable suggestion string> }
  ]
}

Grading scale: A+(90-100), A(80-89), B+(70-79), B(60-69), C(50-59), D(35-49), F(0-34).
The overall score should be a weighted average of all category scores.
matchedKeywords: pull from the actual resume text — tech skills, tools, languages, frameworks, soft skills.
missingKeywords: if a job description is provided, list skills from it that are absent in the resume. If no JD, list commonly expected skills for the apparent role.
suggestions: include 5-8 items mixing errors (critical issues), warnings (improvements), and successes (what's done well).`;

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // ── Check API key ──
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OPENROUTER_API_KEY is not configured. Please add it to your .env.local file.",
        },
        { status: 500 }
      );
    }

    // ── Parse multipart form ──
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const pastedText = formData.get("text") as string | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    let resumeText = "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = file.name.toLowerCase();
      const mimeType = file.type;

      if (mimeType === "application/pdf" || fileName.endsWith(".pdf")) {
        try {
          resumeText = extractFromPdf(buffer);
        } catch (err) {
          console.error("[ATS API] PDF parse error:", err);
          return NextResponse.json(
            {
              error:
                "Failed to parse PDF. Please ensure it is a valid PDF file.",
            },
            { status: 400 }
          );
        }
      } else if (
        mimeType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        mimeType === "application/msword" ||
        fileName.endsWith(".docx") ||
        fileName.endsWith(".doc")
      ) {
        try {
          resumeText = extractFromDocx(buffer);
        } catch (err) {
          console.error("[ATS API] DOCX parse error:", err);
          return NextResponse.json(
            {
              error:
                "Failed to parse Word document. Please try saving as .docx or .txt.",
            },
            { status: 400 }
          );
        }
      } else if (
        mimeType.startsWith("text/") ||
        fileName.endsWith(".txt") ||
        fileName.endsWith(".rtf")
      ) {
        resumeText = new TextDecoder().decode(bytes);
      } else {
        return NextResponse.json(
          {
            error: `Unsupported file type: ${
              file.type || fileName
            }. Please upload PDF, DOCX, or TXT.`,
          },
          { status: 400 }
        );
      }
    } else if (pastedText && pastedText.trim()) {
      resumeText = pastedText;
    } else {
      return NextResponse.json(
        {
          error:
            "No resume content provided. Please upload a file or paste text.",
        },
        { status: 400 }
      );
    }

    resumeText = resumeText.trim();
    if (resumeText.length < 50) {
      return NextResponse.json(
        {
          error:
            "The extracted resume text appears to be too short. Please check your file.",
        },
        { status: 400 }
      );
    }
    // Limit to avoid token overflow
    if (resumeText.length > 12000) resumeText = resumeText.slice(0, 12000);

    // ── Build user prompt ──
    let userPrompt = `Analyze this resume:\n\n---RESUME START---\n${resumeText}\n---RESUME END---`;
    if (jobDescription?.trim()) {
      const jd = jobDescription.slice(0, 3000);
      userPrompt += `\n\n---JOB DESCRIPTION---\n${jd}\n---JOB DESCRIPTION END---\n\nPlease compare the resume against this specific job description for keyword matching and gaps.`;
    }

    // ── Call OpenRouter (free model: meta-llama/llama-3.3-70b-instruct:free) ──
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
        "X-Title": "ATS Resume Analyzer",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL,
        temperature: 0.2,
        max_tokens: 2048,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user",   content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("[ATS API] OpenRouter error:", response.status, errBody);
      return NextResponse.json(
        { error: `OpenRouter API error ${response.status}: ${errBody}` },
        { status: 502 }
      );
    }

    const json = await response.json();
    const raw: string = json.choices?.[0]?.message?.content ?? "";

    // ── Parse & validate JSON ──
    let parsed: ATSResult;
    try {
      // Strip any accidental markdown fences
      const clean = raw
        .replace(/^```json\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
      parsed = JSON.parse(clean);
    } catch {
      console.error("Gemini raw response (parse failed):", raw);
      return NextResponse.json(
        { error: "AI returned an unexpected response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: parsed });
  } catch (err: unknown) {
    console.error("[ATS API] Error:", err);
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}