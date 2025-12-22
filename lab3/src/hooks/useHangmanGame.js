import { useCallback, useEffect, useMemo, useState } from "react";
import { ALPHABET, pickRandomWordFiltered, maskWord } from "../lib/hangman.js";
import useKeyPress from "./useKeyPress.js";
import useHangmanTimer from "./useHangmanTimer.js";

/**
 * Основна логіка гри (Lab 2) + налаштування (Lab 3): attempts, таймер, фільтр довжини слова.
 */
export default function useHangmanGame({
  difficulty,
  wordBank,
  maxAttemptsOverride,
  timeLimitSec,
  tickMs,
  wordLengthMin,
  wordLengthMax,
}) {
  const maxAttempts = useMemo(() => {
    const n = Number(maxAttemptsOverride);
    return Number.isFinite(n) && n >= 3 && n <= 15 ? n : 7;
  }, [maxAttemptsOverride]);

  const [word, setWord] = useState(() =>
    pickRandomWordFiltered(wordBank, difficulty, wordLengthMin, wordLengthMax)
  );
  const [guessedLetters, setGuessedLetters] = useState(() => new Set());
  const [wrongLetters, setWrongLetters] = useState(() => []);
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
  const [status, setStatus] = useState("playing"); // playing | win | lose

  const maskedWord = useMemo(() => maskWord(word, guessedLetters), [word, guessedLetters]);

  const timer = useHangmanTimer({
    isRunning: status === "playing",
    timeLimitSec,
    tickMs,
  });

  // якщо таймер дійшов до 0 — програш
  useEffect(() => {
    if (!timer.enabled) return;
    if (status !== "playing") return;
    if (timer.timeLeftSec === 0) {
      setStatus("lose");
      setAttemptsLeft(0);
    }
  }, [timer.enabled, timer.timeLeftSec, status]);

  // Перевірка завершення гри
  useEffect(() => {
    if (status !== "playing") return;
    if (!maskedWord.includes("_")) {
      setStatus("win");
      return;
    }
    if (attemptsLeft <= 0) setStatus("lose");
  }, [attemptsLeft, maskedWord, status]);

  const guessLetter = useCallback(
    (raw) => {
      if (status !== "playing") return;
      if (!raw) return;
      const letter = String(raw).toUpperCase();
      if (!ALPHABET.has(letter)) return;

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

  useKeyPress((key) => guessLetter(key));

  const resetNewWord = useCallback(() => {
    const nextWord = pickRandomWordFiltered(wordBank, difficulty, wordLengthMin, wordLengthMax);
    setWord(nextWord);
    setGuessedLetters(new Set());
    setWrongLetters([]);
    setAttemptsLeft(maxAttempts);
    setStatus("playing");
    timer.resetTimer();
  }, [wordBank, difficulty, wordLengthMin, wordLengthMax, maxAttempts, timer]);

  const retrySameWord = useCallback(() => {
    setGuessedLetters(new Set());
    setWrongLetters([]);
    setAttemptsLeft(maxAttempts);
    setStatus("playing");
    timer.resetTimer();
  }, [maxAttempts, timer]);

  // При зміні налаштувань/складності — просто готуємо новий раунд
  useEffect(() => {
    resetNewWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, maxAttemptsOverride, timeLimitSec, tickMs, wordLengthMin, wordLengthMax]);

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
    resetNewWord,
    retrySameWord,
    forceLose,
    timer,
    timeSpentSec: timer.timeSpentSec,
  };
}
