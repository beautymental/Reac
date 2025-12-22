import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import GameHUD from "../widgets/GameHUD.jsx";
import WordView from "../widgets/WordView.jsx";
import Keyboard from "../widgets/Keyboard.jsx";
import WrongLetters from "../widgets/WrongLetters.jsx";
import HangmanProgress from "../widgets/HangmanProgress.jsx";
import EndGameDialog from "../widgets/EndGameDialog.jsx";

export default function GamePage({ settings, game, onGuess, onGiveUp, modal, modalActions }) {
  return (
    <div className="stack">
      <Card
        title="Гра"
        subtitle="Логіка гри + таймер/спроби/фільтр довжини слова з налаштувань."
        right={<Badge tone={game.status === "playing" ? "info" : "warning"}>{game.status}</Badge>}
      >
        <GameHUD
          playerName={settings.playerName}
          difficulty={settings.difficulty}
          timer={game.timer}
        />

        <div className="twoCol">
          <div className="panel">
            <h3 className="panel__title">Слово</h3>
            <WordView maskedWord={game.maskedWord} />
            <WrongLetters letters={game.wrongLetters} />
          </div>

          <div className="panel">
            <h3 className="panel__title">Спроби</h3>
            <HangmanProgress attemptsLeft={game.attemptsLeft} maxAttempts={game.maxAttempts} />
            <div className="actions">
              <Button variant="danger" onClick={onGiveUp} disabled={game.status !== "playing"}>
                Здатись
              </Button>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3 className="panel__title">Клавіатура</h3>
          <Keyboard
            guessedLetters={game.guessedLetters}
            wrongLetters={game.wrongLetters}
            disabled={game.status !== "playing"}
            onGuess={onGuess}
          />
          <div className="keyboard__note">Підказка: натискай A–Z на фізичній клавіатурі.</div>
        </div>
      </Card>

      {/* Portal modal про завершення гри */}
      <EndGameDialog modal={modal} actions={modalActions} />
    </div>
  );
}
