"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/HomeCompoents/Hero";
import About from "@/components/HomeCompoents/About";
import Skills from "@/components/HomeCompoents/Skills";
import Experience from "@/components/HomeCompoents/Experience";
import Projects from "@/components/HomeCompoents/Projects";
import Achievements from "@/components/HomeCompoents/Achievements";
import Testimonials from "@/components/HomeCompoents/Testimonials";
import Contact from "@/components/HomeCompoents/Contact";
import LoadingScreen from "@/components/Loading/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (<>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Testimonials />
        <Contact />
      </>
      )}</>
  );
}
