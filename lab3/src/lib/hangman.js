export const ALPHABET = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

export function maskWord(word, guessedSet) {
  const guessed = guessedSet ?? new Set();
  const chars = String(word).toUpperCase().split("");
  return chars
    .map((ch) => {
      if (ch === " " || ch === "-") return ch;
      if (!ALPHABET.has(ch)) return ch;
      return guessed.has(ch) ? ch : "_";
    })
    .join("");
}

function pick(list) {
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}

export function pickRandomWordFiltered(wordBank, difficulty, minLen = 3, maxLen = 14) {
  const rawList = wordBank?.[difficulty] ?? wordBank?.normal ?? ["REACT"];
  const list = rawList
    .map((w) => String(w).toUpperCase().trim())
    .filter((w) => w.length >= Number(minLen || 3) && w.length <= Number(maxLen || 14));

  const finalList = list.length ? list : rawList.map((w) => String(w).toUpperCase().trim());
  return pick(finalList) ?? "REACT";
}
