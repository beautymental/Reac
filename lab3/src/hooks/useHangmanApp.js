import { useCallback, useEffect, useMemo, useState } from "react";
import { useSettings } from "../state/SettingsContext.jsx";
import useHangmanGame from "./useHangmanGame.js";
import useWordBank from "./useWordBank.js";

/**
 * Контролер застосунку (без роутингу) + керування модалкою завершення гри (portal).
 * Компоненти лишаються максимально чистими.
 */
export default function useHangmanApp() {
  const { settings } = useSettings();
  const words = useWordBank();

  const [view, setView] = useState("start"); // start | game | result
  const [result, setResult] = useState(null);

  const [modal, setModal] = useState({ isOpen: false, status: null, summary: null });

  const game = useHangmanGame({
    difficulty: settings.difficulty,
    wordBank: words,
    maxAttemptsOverride: settings.maxAttempts,
    timeLimitSec: settings.timeLimitSec,
    tickMs: settings.tickMs,
    wordLengthMin: settings.wordLengthMin,
    wordLengthMax: settings.wordLengthMax,
  });

  // Коли гра завершилась — відкриваємо модалку через портал
  useEffect(() => {
    if (view !== "game") return;
    if (game.status === "win" || game.status === "lose") {
      const summary = {
        status: game.status,
        word: game.word,
        attemptsUsed: game.maxAttempts - game.attemptsLeft,
        wrongLetters: game.wrongLetters,
        timeSpentSec: game.timeSpentSec,
      };
      setModal({ isOpen: true, status: game.status, summary });
      setResult(summary);
    }
  }, [view, game.status, game.word, game.maxAttempts, game.attemptsLeft, game.wrongLetters, game.timeSpentSec]);

  const goStart = useCallback(() => {
    setModal({ isOpen: false, status: null, summary: null });
    setView("start");
  }, []);

  const startGame = useCallback(() => {
    game.resetNewWord();
    setModal({ isOpen: false, status: null, summary: null });
    setView("game");
  }, [game]);

  const playAgain = useCallback(() => {
    game.resetNewWord();
    setModal({ isOpen: false, status: null, summary: null });
    setView("game");
  }, [game]);

  const giveUp = useCallback(() => {
    game.forceLose();
  }, [game]);

  const closeModal = useCallback(() => {
    setModal((m) => ({ ...m, isOpen: false }));
  }, []);

  // Дії з модалки:
  const nextRound = useCallback(() => {
    game.resetNewWord();
    setModal({ isOpen: false, status: null, summary: null });
  }, [game]);

  const retrySame = useCallback(() => {
    game.retrySameWord();
    setModal({ isOpen: false, status: null, summary: null });
  }, [game]);

  const openResultPage = useCallback(() => {
    setModal((m) => ({ ...m, isOpen: false }));
    setView("result");
  }, []);

  const headerSubtitle = useMemo(() => {
    if (view === "start") return "Налаштування гри (збереження в localStorage)";
    if (view === "game") return "Грай та відгадуй слово";
    return "Підсумок";
  }, [view]);

  const actions = useMemo(
    () => ({
      goStart,
      startGame,
      playAgain,
      giveUp,
      guessLetter: game.guessLetter,
      modalActions: { closeModal, nextRound, retrySame, goStart, openResultPage },
    }),
    [goStart, startGame, playAgain, giveUp, game.guessLetter, closeModal, nextRound, retrySame, openResultPage]
  );

  return { view, settings, game, result, actions, headerSubtitle, modal };
}
