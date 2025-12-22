import { useMemo } from "react";

/**
 * Невеликий словник для лаби.
 * Можеш розширити або замінити на API/файл у наступних лабах.
 */
export default function useWordBank() {
  return useMemo(
    () => ({
      easy: ["REACT", "VITE", "HOOK", "STATE", "HTML", "CSS"],
      normal: ["COMPONENT", "JAVASCRIPT", "FUNCTION", "EFFECT", "PROPS", "BROWSER"],
      hard: ["ARCHITECTURE", "REUSABILITY", "DESTRUCTURING", "SYNCHRONIZATION", "IMMUTABILITY"],
    }),
    []
  );
}
