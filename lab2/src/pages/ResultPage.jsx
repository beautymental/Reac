import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";

export default function ResultPage({ result, playerName, onPlayAgain, onBackToStart }) {
  const isWin = result?.status === "win";

  return (
    <div className="stack">
      <Card
        title="Результат"
        subtitle="Гра завершена."
        right={<Badge tone={isWin ? "success" : "danger"}>{isWin ? "WIN" : "LOSE"}</Badge>}
      >
        <div className="resultHero">
          <div className="resultHero__title">{isWin ? "Ти переміг 🎉" : "Ти програв 😿"}</div>
          <div className="resultHero__text">
            Гравець: <strong>{playerName || "Гість"}</strong>
            <br />
            Слово: <strong>{result?.word || "—"}</strong>
            <br />
            Використано спроб: <strong>{result?.attemptsUsed ?? "—"}</strong>
            <br />
            Невірні літери: <strong>{(result?.wrongLetters || []).join(", ") || "—"}</strong>
          </div>
        </div>

        <div className="actions">
          <Button onClick={onPlayAgain}>Грати ще раз</Button>
          <Button variant="ghost" onClick={onBackToStart}>
            Назад на старт
          </Button>
        </div>

        <div className="hint">
          У Lab 2 логіка винесена в кастомні хуки: useHangmanApp, useHangmanGame,
          useKeyPress, useStartSettings.
        </div>
      </Card>
    </div>
  );
}
