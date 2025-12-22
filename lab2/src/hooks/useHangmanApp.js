import { useMemo, useState, useCallback, useEffect } from "react";
import useStartSettings from "./useStartSettings.js";
import useHangmanGame from "./useHangmanGame.js";
import useWordBank from "./useWordBank.js";

/**
 * Один "контролер" застосунку без роутингу.
 * App.jsx лишається чистим: тільки рендер сторінок.
 */
export default function useHangmanApp() {
  const settings = useStartSettings();
  const words = useWordBank();

  const [view, setView] = useState("start"); // start | game | result
  const [result, setResult] = useState(null); // { status, word, attemptsUsed, wrongLetters }

  const game = useHangmanGame({
    difficulty: settings.difficulty,
    wordBank: words,
  });

  // Автоперехід на Result, коли гра завершена
  useEffect(() => {
    if (view !== "game") return;
    if (game.status === "win" || game.status === "lose") {
      setResult({
        status: game.status,
        word: game.word,
        attemptsUsed: game.maxAttempts - game.attemptsLeft,
        wrongLetters: game.wrongLetters,
      });
      setView("result");
    }
  }, [view, game.status, game.word, game.maxAttempts, game.attemptsLeft, game.wrongLetters]);

  const goStart = useCallback(() => {
    setView("start");
  }, []);

  const startGame = useCallback(() => {
    game.reset(); // вибере нове слово
    setView("game");
  }, [game]);

  const playAgain = useCallback(() => {
    game.reset();
    setView("game");
  }, [game]);

  const giveUp = useCallback(() => {
    game.forceLose();
  }, [game]);

  const headerSubtitle = useMemo(() => {
    if (view === "start") return "Підготовка до гри";
    if (view === "game") return "Відгадай слово по літерах";
    return "Підсумок";
  }, [view]);

  const actions = useMemo(
    () => ({
      goStart,
      startGame,
      playAgain,
      giveUp,
      guessLetter: game.guessLetter,
      setPlayerName: settings.setPlayerName,
      setDifficulty: settings.setDifficulty,
    }),
    [goStart, startGame, playAgain, giveUp, game.guessLetter, settings.setPlayerName, settings.setDifficulty]
  );

  return { view, settings, game, result, actions, headerSubtitle };
}
