import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import GameHUD from "../widgets/GameHUD.jsx";
import WordView from "../widgets/WordView.jsx";
import Keyboard from "../widgets/Keyboard.jsx";
import WrongLetters from "../widgets/WrongLetters.jsx";
import HangmanProgress from "../widgets/HangmanProgress.jsx";
import EndGameDialog from "../widgets/EndGameDialog.jsx";
import useWordBank from "../hooks/useWordBank.js";
import useHangmanGame from "../hooks/useHangmanGame.js";
import { selectSettings } from "../store/slices/settingsSlice.js";
import { addResult } from "../store/slices/resultsSlice.js";
import styles from "./GamePage.module.css";

export default function GamePage(){
  const { userId="guest" } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = useSelector((s) => selectSettings(s, userId));
  const words = useWordBank();

  const game = useHangmanGame({
    difficulty: settings.difficulty,
    wordBank: words,
    maxAttempts: settings.maxAttempts,
    timeLimitSec: settings.timeLimitSec,
    tickMs: settings.tickMs,
    wordLengthMin: settings.wordLengthMin,
    wordLengthMax: settings.wordLengthMax,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const summary = useMemo(() => ({
    status: game.status,
    word: game.word,
    attemptsUsed: game.maxAttempts - game.attemptsLeft,
    wrongLetters: game.wrongLetters,
    timeSpentSec: game.timeSpentSec,
  }), [game.status, game.word, game.maxAttempts, game.attemptsLeft, game.wrongLetters, game.timeSpentSec]);

  useEffect(() => {
    if (game.status === "win" || game.status === "lose") {
      dispatch(addResult({ userId, ...summary }));
      setModalOpen(true);
    }
  }, [game.status, dispatch, userId, summary]);

  return (
    <div className={styles.stack}>
      <Card
        title="Гра"
        subtitle="Після завершення результат записується в Redux store і відображається в таблиці."
        right={<Badge tone="info">/u/:userId/game</Badge>}
      >
        <GameHUD playerName={settings.playerName} difficulty={settings.difficulty} timer={game.timer} />

        <div className={styles.twoCol}>
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Слово</h3>
            <WordView maskedWord={game.maskedWord} />
            <WrongLetters letters={game.wrongLetters} />
          </div>

          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Спроби</h3>
            <HangmanProgress attemptsLeft={game.attemptsLeft} maxAttempts={game.maxAttempts} />
            <div className={styles.actions}>
              <Button variant="danger" onClick={game.forceLose} disabled={game.status !== "playing"}>Здатись</Button>
              <Button variant="ghost" onClick={() => game.resetNewWord()}>Нове слово</Button>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Клавіатура</h3>
          <Keyboard
            guessedLetters={game.guessedLetters}
            wrongLetters={game.wrongLetters}
            disabled={game.status !== "playing"}
            onGuess={game.guessLetter}
          />
          <div className={styles.note}>Підказка: натискай A–Z на фізичній клавіатурі.</div>
        </div>
      </Card>

      <EndGameDialog
        isOpen={modalOpen}
        summary={summary}
        onClose={() => setModalOpen(false)}
        onNextRound={() => { setModalOpen(false); game.resetNewWord(); }}
        onRetry={() => { setModalOpen(false); game.retrySameWord(); }}
        onGoResults={() => { setModalOpen(false); navigate(`/u/${userId}/results`); }}
        onGoStart={() => { setModalOpen(false); navigate(`/u/${userId}/start`); }}
      />
    </div>
  );
}
