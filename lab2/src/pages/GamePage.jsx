import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import GameHUD from "../widgets/GameHUD.jsx";
import WordView from "../widgets/WordView.jsx";
import Keyboard from "../widgets/Keyboard.jsx";
import WrongLetters from "../widgets/WrongLetters.jsx";
import HangmanProgress from "../widgets/HangmanProgress.jsx";

export default function GamePage({
  playerName,
  difficulty,
  maskedWord,
  attemptsLeft,
  maxAttempts,
  wrongLetters,
  guessedLetters,
  status,
  onGuess,
  onGiveUp,
}) {
  return (
    <div className="stack">
      <Card
        title="Гра"
        subtitle="Відгадай слово. Кожна помилка зменшує кількість спроб."
        right={<Badge tone={status === "playing" ? "info" : "warning"}>{status}</Badge>}
      >
        <GameHUD playerName={playerName} difficulty={difficulty} />

        <div className="twoCol">
          <div className="panel">
            <h3 className="panel__title">Слово</h3>
            <WordView maskedWord={maskedWord} />
            <WrongLetters letters={wrongLetters} />
          </div>

          <div className="panel">
            <h3 className="panel__title">Спроби</h3>
            <HangmanProgress attemptsLeft={attemptsLeft} maxAttempts={maxAttempts} />
            <div className="actions">
              <Button variant="danger" onClick={onGiveUp}>
                Здатись
              </Button>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3 className="panel__title">Клавіатура</h3>
          <Keyboard
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            disabled={status !== "playing"}
            onGuess={onGuess}
          />
          <div className="keyboard__note">
            Підказка: натискай клавіші A–Z на клавіатурі.
          </div>
        </div>
      </Card>
    </div>
  );
}
