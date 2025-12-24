const KEY = "hangman.rtk.v1";

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    
  }
}
