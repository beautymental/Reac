export const ALPHABET = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
export const DIFFICULTY_ATTEMPTS = {
  easy: 8,
  normal: 7,
  hard: 6,
};

export function getMaxAttempts(difficulty) {
  return DIFFICULTY_ATTEMPTS[difficulty] ?? 7;
}

export function pickRandomWord(wordBank, difficulty) {
  const list = wordBank?.[difficulty] ?? wordBank?.normal ?? ["REACT"];
  const idx = Math.floor(Math.random() * list.length);
  return String(list[idx] ?? "REACT").toUpperCase().trim();
}

/**
 * Повертає маску слова, наприклад: R E _ C T
 * Підтримує дефіси/пробіли як відкриті символи.
 */
export function maskWord(word, guessedSet) {
  const guessed = guessedSet ?? new Set();
  const chars = String(word).toUpperCase().split("");

  return chars
    .map((ch) => {
      if (ch === " " || ch === "-") return ch;
      if (!ALPHABET.has(ch)) return ch; // інші символи
      return guessed.has(ch) ? ch : "_";
    })
    .join("");
}
