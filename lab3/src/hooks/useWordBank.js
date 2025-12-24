import { useMemo } from "react";


export default function useWordBank() {
  return useMemo(
    () => ({
      easy: ["REACT", "VITE", "HOOK", "STATE", "HTML", "CSS", "NODE", "WEB"],
      normal: ["COMPONENT", "JAVASCRIPT", "FUNCTION", "EFFECT", "PROPS", "BROWSER", "STORAGE", "PORTAL"],
      hard: ["ARCHITECTURE", "REUSABILITY", "DESTRUCTURING", "SYNCHRONIZATION", "IMMUTABILITY", "CONFIGURATION"],
    }),
    []
  );
}
