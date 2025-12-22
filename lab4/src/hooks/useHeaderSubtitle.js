import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function useHeaderSubtitle() {
  const loc = useLocation();
  return useMemo(() => {
    if (loc.pathname.endsWith("/start")) return "Налаштування + перехід за userId";
    if (loc.pathname.endsWith("/game")) return "Гра (routing + state management)";
    if (loc.pathname.endsWith("/result")) return "Результат";
    return "Hangman";
  }, [loc.pathname]);
}
