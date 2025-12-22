import { useCallback, useEffect, useMemo, useState } from "react";
import { ALPHABET, pickRandomWordFiltered, maskWord } from "../lib/hangman.js";
import useKeyPress from "./useKeyPress.js";
import useHangmanTimer from "./useHangmanTimer.js";

export default function useHangmanGame({
  difficulty, wordBank, maxAttempts, timeLimitSec, tickMs, wordLengthMin, wordLengthMax
}){
  const attempts = useMemo(() => {
    const n = Number(maxAttempts);
    return Number.isFinite(n) && n >= 3 && n <= 15 ? n : 7;
  }, [maxAttempts]);

  const [word, setWord] = useState(() => pickRandomWordFiltered(wordBank, difficulty, wordLengthMin, wordLengthMax));
  const [guessedLetters, setGuessedLetters] = useState(() => new Set());
  const [wrongLetters, setWrongLetters] = useState(() => []);
  const [attemptsLeft, setAttemptsLeft] = useState(attempts);
  const [status, setStatus] = useState("playing");

  const maskedWord = useMemo(() => maskWord(word, guessedLetters), [word, guessedLetters]);
  const timer = useHangmanTimer({ isRunning: status === "playing", timeLimitSec, tickMs });

  useEffect(() => {
    if (!timer.enabled) return;
    if (status !== "playing") return;
    if (timer.timeLeftSec === 0) {
      setStatus("lose");
      setAttemptsLeft(0);
    }
  }, [timer.enabled, timer.timeLeftSec, status]);

  useEffect(() => {
    if (status !== "playing") return;
    if (!maskedWord.includes("_")) setStatus("win");
    else if (attemptsLeft <= 0) setStatus("lose");
  }, [attemptsLeft, maskedWord, status]);

  const guessLetter = useCallback((raw) => {
    if (status !== "playing") return;
    const letter = String(raw||"").toUpperCase();
    if (!ALPHABET.has(letter)) return;
    if (guessedLetters.has(letter) || wrongLetters.includes(letter)) return;

    if (word.includes(letter)) {
      setGuessedLetters((prev)=> {
        const next = new Set(prev); next.add(letter); return next;
      });
    } else {
      setWrongLetters((prev)=> [...prev, letter]);
      setAttemptsLeft((prev)=> Math.max(0, prev-1));
    }
  }, [status, word, guessedLetters, wrongLetters]);

  useKeyPress((k)=> guessLetter(k));

  const resetNewWord = useCallback(() => {
    const nextWord = pickRandomWordFiltered(wordBank, difficulty, wordLengthMin, wordLengthMax);
    setWord(nextWord);
    setGuessedLetters(new Set());
    setWrongLetters([]);
    setAttemptsLeft(attempts);
    setStatus("playing");
    timer.resetTimer();
  }, [wordBank, difficulty, wordLengthMin, wordLengthMax, attempts, timer]);

  const retrySameWord = useCallback(() => {
    setGuessedLetters(new Set());
    setWrongLetters([]);
    setAttemptsLeft(attempts);
    setStatus("playing");
    timer.resetTimer();
  }, [attempts, timer]);

  useEffect(() => { resetNewWord(); /* eslint-disable-next-line */ }, [difficulty, attempts, timeLimitSec, tickMs, wordLengthMin, wordLengthMax]);

  const forceLose = useCallback(() => {
    if (status !== "playing") return;
    setAttemptsLeft(0);
    setStatus("lose");
  }, [status]);

  return { word, maskedWord, maxAttempts: attempts, attemptsLeft, guessedLetters, wrongLetters, status, guessLetter, resetNewWord, retrySameWord, forceLose, timer, timeSpentSec: timer.timeSpentSec };
}
