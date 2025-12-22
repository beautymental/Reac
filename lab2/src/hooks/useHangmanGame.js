import { useCallback, useEffect, useMemo, useState } from "react";
import { ALPHABET, getMaxAttempts, pickRandomWord, maskWord } from "../lib/hangman.js";
import useKeyPress from "./useKeyPress.js";

/**
 * Основна логіка гри. UI викликає тільки дії з цього хуку.
 */
export default function useHangmanGame({ difficulty, wordBank }) {
  const maxAttempts = useMemo(() => getMaxAttempts(difficulty), [difficulty]);

  const [word, setWord] = useState(() => pickRandomWord(wordBank, difficulty));
  const [guessedLetters, setGuessedLetters] = useState(() => new Set());
  const [wrongLetters, setWrongLetters] = useState(() => []); // array for stable order
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
  const [status, setStatus] = useState("playing"); // playing | win | lose

  // синхронізація при зміні складності
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const maskedWord = useMemo(() => maskWord(word, guessedLetters), [word, guessedLetters]);

  // Перевірка завершення гри
  useEffect(() => {
    if (status !== "playing") return;

    const isWordGuessed = !maskedWord.includes("_");
    if (isWordGuessed) {
      setStatus("win");
      return;
    }
    if (attemptsLeft <= 0) {
      setStatus("lose");
    }
  }, [attemptsLeft, maskedWord, status]);

  const guessLetter = useCallback(
    (raw) => {
      if (status !== "playing") return;
      if (!raw) return;

      const letter = String(raw).toUpperCase();
      if (!ALPHABET.has(letter)) return;

      // якщо вже пробували
      if (guessedLetters.has(letter) || wrongLetters.includes(letter)) return;

      if (word.includes(letter)) {
        setGuessedLetters((prev) => {
          const next = new Set(prev);
          next.add(letter);
          return next;
        });
      } else {
        setWrongLetters((prev) => [...prev, letter]);
        setAttemptsLeft((prev) => Math.max(0, prev - 1));
      }
    },
    [status, word, guessedLetters, wrongLetters]
  );

  // Підтримка введення з клавіатури
  useKeyPress((key) => {
    guessLetter(key);
  });

  const reset = useCallback(() => {
    const nextWord = pickRandomWord(wordBank, difficulty);
    setWord(nextWord);
    setGuessedLetters(new Set());
    setWrongLetters([]);
    setAttemptsLeft(getMaxAttempts(difficulty));
    setStatus("playing");
  }, [wordBank, difficulty]);

  const forceLose = useCallback(() => {
    if (status !== "playing") return;
    setAttemptsLeft(0);
    setStatus("lose");
  }, [status]);

  return {
    word,
    maskedWord,
    maxAttempts,
    attemptsLeft,
    guessedLetters,
    wrongLetters,
    status,
    guessLetter,
    reset,
    forceLose,
  };
}
