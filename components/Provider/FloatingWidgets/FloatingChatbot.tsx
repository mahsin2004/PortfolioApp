'use client'

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey there! 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are a friendly, concise assistant embedded in a website chatbot. Keep replies short and helpful.",
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.map((b: { type: string; text?: string }) => b.text || "").join("") || "Sorry, something went wrong.";
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Oops! Something went wrong. Try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .fcb-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        /* Pulse ring on the toggle button */
        @keyframes fcb-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(99,102,241,0.55); }
          70%  { box-shadow: 0 0 0 12px rgba(99,102,241,0); }
          100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        }
        @keyframes fcb-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes fcb-pop {
          0%   { opacity: 0; transform: scale(0.88) translateY(16px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fcb-blink {
          0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; }
        }
        @keyframes fcb-msg-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fcb-toggle {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
          color: #fff;
          font-size: 1.4rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fcb-pulse 2.4s ease-out infinite, fcb-float 3.5s ease-in-out infinite;
          transition: transform 0.2s, filter 0.2s;
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
        }
        .fcb-toggle:hover { filter: brightness(1.12); }

        .fcb-window {
          position: fixed;
          bottom: 5.5rem;
          right: 1.75rem;
          z-index: 9998;
          width: 360px;
          max-height: 520px;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: #0f0f13;
          border: 1px solid rgba(99,102,241,0.25);
          box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset;
          animation: fcb-pop 0.28s cubic-bezier(.34,1.56,.64,1) both;
        }

        /* Header */
        .fcb-header {
          padding: 0.9rem 1.1rem;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-bottom: 1px solid rgba(99,102,241,0.18);
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .fcb-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .fcb-header-info { flex: 1; }
        .fcb-header-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: #e2e8f0;
          letter-spacing: 0.01em;
        }
        .fcb-header-status {
          font-size: 0.7rem;
          color: #34d399;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-top: 1px;
        }
        .fcb-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #34d399;
          display: inline-block;
        }
        .fcb-close {
          background: rgba(255,255,255,0.06);
          border: none;
          border-radius: 8px;
          color: #94a3b8;
          width: 28px; height: 28px;
          cursor: pointer;
          font-size: 0.8rem;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .fcb-close:hover { background: rgba(255,255,255,0.12); color: #e2e8f0; }

        /* Messages */
        .fcb-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(99,102,241,0.3) transparent;
        }
        .fcb-messages::-webkit-scrollbar { width: 4px; }
        .fcb-messages::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 4px; }

        .fcb-bubble {
          max-width: 82%;
          padding: 0.6rem 0.85rem;
          border-radius: 14px;
          font-size: 0.82rem;
          line-height: 1.55;
          animation: fcb-msg-in 0.22s ease both;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .fcb-bubble.user {
          align-self: flex-end;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .fcb-bubble.assistant {
          align-self: flex-start;
          background: rgba(255,255,255,0.07);
          color: #cbd5e1;
          border: 1px solid rgba(255,255,255,0.07);
          border-bottom-left-radius: 4px;
        }

        /* Typing indicator */
        .fcb-typing {
          align-self: flex-start;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          border-bottom-left-radius: 4px;
          padding: 0.65rem 0.9rem;
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .fcb-typing span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #6366f1;
          animation: fcb-blink 1.4s infinite ease-in-out;
        }
        .fcb-typing span:nth-child(2) { animation-delay: 0.2s; }
        .fcb-typing span:nth-child(3) { animation-delay: 0.4s; }

        /* Input row */
        .fcb-input-row {
          padding: 0.8rem;
          border-top: 1px solid rgba(99,102,241,0.15);
          background: rgba(255,255,255,0.02);
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .fcb-input {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 10px;
          padding: 0.55rem 0.75rem;
          color: #e2e8f0;
          font-size: 0.82rem;
          outline: none;
          transition: border-color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .fcb-input::placeholder { color: #475569; }
        .fcb-input:focus { border-color: rgba(99,102,241,0.5); }

        .fcb-send {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: filter 0.15s, transform 0.15s;
        }
        .fcb-send:hover:not(:disabled) { filter: brightness(1.15); transform: scale(1.06); }
        .fcb-send:disabled { opacity: 0.45; cursor: default; }

        @media (max-width: 420px) {
          .fcb-window { width: calc(100vw - 2rem); right: 1rem; bottom: 5rem; }
          .fcb-toggle { right: 1rem; bottom: 1rem; }
        }
      `}</style>

      <div className="fcb-root">
        {/* Toggle button — always visible */}
        <button
          className="fcb-toggle"
          onClick={() => setOpen((o) => !o)}
          title={open ? "Close chat" : "Open chat"}
          aria-label="Toggle chatbot"
        >
          {open ? "✕" : "💬"}
        </button>

        {/* Chat window */}
        {open && (
          <div className="fcb-window" role="dialog" aria-label="Chat assistant">
            {/* Header */}
            <div className="fcb-header">
              <div className="fcb-avatar">🤖</div>
              <div className="fcb-header-info">
                <div className="fcb-header-name">AI Assistant</div>
                <div className="fcb-header-status">
                  <span className="fcb-dot" /> Online
                </div>
              </div>
              <button className="fcb-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>

            {/* Messages */}
            <div className="fcb-messages">
              {messages.map((m, i) => (
                <div key={i} className={`fcb-bubble ${m.role}`}>{m.content}</div>
              ))}
              {loading && (
                <div className="fcb-typing">
                  <span /><span /><span />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="fcb-input-row">
              <input
                className="fcb-input"
                placeholder="Type a message…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                disabled={loading}
                autoFocus
              />
              <button className="fcb-send" onClick={send} disabled={loading || !input.trim()} aria-label="Send">
                ➤
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingChatbot;