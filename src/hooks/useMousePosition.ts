import { useState, useEffect } from "react";

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<string | null>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isLink = target.tagName.toLowerCase() === 'a' || target.closest('a');
      const isButton = target.tagName.toLowerCase() === 'button' || target.closest('button');
      const isText = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'].includes(target.tagName.toLowerCase());
      const isImage = target.tagName.toLowerCase() === 'img' || target.classList.contains('card-image');
      const isGithubCard = target.closest('[data-github-card]');

      if (isGithubCard) setIsHovering('github');
      else if (isLink) setIsHovering('link');
      else if (isButton) setIsHovering('button');
      else if (isImage) setIsHovering('image');
      else if (isText) setIsHovering('text');
      else setIsHovering(null);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return { ...mousePosition, isHovering };
}
