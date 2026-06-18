"use client";

import { useEffect, useState } from "react";

const CHARS = "█▓▒░|/\\-+*#@$%^&";

export function ScrambleText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let iteration = 0;
    let interval: any = null;
    
    const startScramble = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setDisplayText(
          text.split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return letter === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    };

    const timeout = setTimeout(startScramble, delay);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
}
