import { useMemo } from "react";

/**
 * Словник. Для Lab 3 ми також підтримуємо фільтр по довжині слова в useHangmanGame.
 */
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
