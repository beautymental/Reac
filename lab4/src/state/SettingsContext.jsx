import { createContext, useCallback, useContext, useMemo, useState } from "react";

const DEFAULTS = {
  playerName: "",
  difficulty: "normal",
  maxAttempts: 7,
  timeLimitSec: 0,
  tickMs: 1000,
  wordLengthMin: 3,
  wordLengthMax: 14,
};

const SettingsContext = createContext(null);

function safeParse(json) {
  try { return JSON.parse(json); } catch { return null; }
}

function storageKey(userId) {
  return `hangman.settings.v2.${userId}`;
}

export function SettingsProvider({ children, userId }) {
  const [settings, setSettings] = useState(() => {
    const raw = localStorage.getItem(storageKey(userId));
    const parsed = raw ? safeParse(raw) : null;
    return { ...DEFAULTS, ...(parsed || {}) };
  });

  const updateSettings = useCallback((patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(storageKey(userId), JSON.stringify(next));
      return next;
    });
  }, [userId]);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULTS);
    localStorage.setItem(storageKey(userId), JSON.stringify(DEFAULTS));
  }, [userId]);

  const value = useMemo(() => ({ settings, updateSettings, resetSettings, userId }), [settings, updateSettings, resetSettings, userId]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export const SETTINGS_DEFAULTS = DEFAULTS;
