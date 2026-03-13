"use client";
import ATSChecker from "@/components/ATSChecker/ATSChecker";
import { useState, useEffect } from "react";

export default function Home() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsLoading(false), 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <ATSChecker />
    </>
  );
}
