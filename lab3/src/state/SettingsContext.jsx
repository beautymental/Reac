import { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "hangman.settings.v1";

const DEFAULTS = {
  playerName: "",
  difficulty: "normal", 

  maxAttempts: 7,        
  timeLimitSec: 0,       
  tickMs: 1000,         
  wordLengthMin: 3,      
  wordLengthMax: 14
};

const SettingsContext = createContext(null);

function safeParse(json) {
  try { return JSON.parse(json); } catch { return null; }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? safeParse(raw) : null;
    return { ...DEFAULTS, ...(parsed || {}) };
  });

  const updateSettings = useCallback((patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS));
  }, []);

  const value = useMemo(() => ({ settings, updateSettings, resetSettings }), [settings, updateSettings, resetSettings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export const SETTINGS_DEFAULTS = DEFAULTS;
