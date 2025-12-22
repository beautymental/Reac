import { useEffect } from "react";

/**
 * Легкий хук для прослуховування натискань клавіш.
 * Виносимо з компонентів, щоб вони були чистими.
 */
export default function useKeyPress(onKey) {
  useEffect(() => {
    function handler(e) {
      // ігноруємо, якщо фокус у input/select/textarea
      const tag = (e.target?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      // беремо тільки одиночні символи
      if (typeof e.key !== "string" || e.key.length !== 1) return;
      onKey?.(e.key);
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onKey]);
}
