import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Таймер раунду:
 * - timeLimitSec = 0 => вимкнено
 * - tickMs => частота оновлення
 */
export default function useHangmanTimer({ isRunning, timeLimitSec, tickMs }) {
  const enabled = (timeLimitSec ?? 0) > 0;
  const [elapsedMs, setElapsedMs] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    if (isRunning) {
      // старт або продовження
      if (startRef.current === null) startRef.current = Date.now() - elapsedMs;
    } else {
      // пауза
      if (startRef.current !== null) {
        setElapsedMs(Date.now() - startRef.current);
        startRef.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, enabled]);

  useEffect(() => {
    if (!enabled) return;
    if (!isRunning) return;

    const id = setInterval(() => {
      if (startRef.current === null) return;
      setElapsedMs(Date.now() - startRef.current);
    }, Math.max(100, tickMs ?? 1000));

    return () => clearInterval(id);
  }, [enabled, isRunning, tickMs]);

  const timeLeftSec = useMemo(() => {
    if (!enabled) return null;
    const left = Math.max(0, (timeLimitSec * 1000 - elapsedMs) / 1000);
    return Math.ceil(left);
  }, [enabled, timeLimitSec, elapsedMs]);

  const timeSpentSec = useMemo(() => Math.floor(elapsedMs / 1000), [elapsedMs]);

  const resetTimer = () => {
    setElapsedMs(0);
    startRef.current = null;
  };

  return { enabled, timeLeftSec, timeSpentSec, resetTimer };
}
