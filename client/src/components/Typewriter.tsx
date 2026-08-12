import { useEffect, useState } from "react";

type TypewriterProps = {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
};

export function Typewriter({
  words,
  className,
  typeSpeed = 90,
  deleteSpeed = 55,
  pauseAfterType = 1100,
  pauseAfterDelete = 300,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setText(words[0] ?? "");
      return;
    }

    const currentWord = words[wordIndex % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timer = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setPhase("pausing"), pauseAfterType);
      }
    } else if (phase === "pausing") {
      timer = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      } else {
        timer = setTimeout(() => setPhase("waiting"), pauseAfterDelete);
      }
    } else if (phase === "waiting") {
      setWordIndex((current) => (current + 1) % words.length);
      setPhase("typing");
    }

    return () => clearTimeout(timer);
  }, [text, phase, wordIndex, words, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

  return (
    <span className={className ? `typewriter ${className}` : "typewriter"}>
      {text}
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}
