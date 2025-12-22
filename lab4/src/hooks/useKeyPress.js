import { useEffect } from "react";
export default function useKeyPress(onKey) {
  useEffect(() => {
    function handler(e) {
      const tag = (e.target?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      if (typeof e.key !== "string" || e.key.length !== 1) return;
      onKey?.(e.key);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onKey]);
}
