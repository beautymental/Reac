import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function useHeaderSubtitle(){
  const loc = useLocation();
  return useMemo(() => {
    if (loc.pathname.endsWith("/start")) return "Налаштування (Redux Toolkit)";
    if (loc.pathname.endsWith("/game")) return "Гра (результати пишуться в store)";
    if (loc.pathname.endsWith("/results")) return "Таблиця результатів (Redux Toolkit)";
    return "Hangman";
  }, [loc.pathname]);
}
