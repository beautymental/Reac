import { useNavigate, useParams } from "react-router-dom";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import { useGameStore } from "../state/GameContext.jsx";
import { useSettings } from "../state/SettingsContext.jsx";
import styles from "./ResultPage.module.css";

export default function ResultPage() {
  const { userId = "guest" } = useParams();
  const navigate = useNavigate();
  const { lastResult } = useGameStore();
  const { settings } = useSettings();

  const isWin = lastResult?.status === "win";

  return (
    <div className={styles.stack}>
      <Card
        title="Результат"
        subtitle="Береться зі state management (GameContext)."
        right={<Badge tone="info">/u/:userId/result</Badge>}
      >
        <div className={styles.hero}>
          <div className={styles.heroTitle}>{lastResult ? (isWin ? "Ти переміг 🎉" : "Ти програв 😿") : "Немає результату"}</div>
          <div className={styles.heroText}>
            Гравець: <strong>{settings.playerName || "Гість"}</strong><br/>
            Слово: <strong>{lastResult?.word || "—"}</strong><br/>
            Спроб: <strong>{lastResult?.attemptsUsed ?? "—"}</strong><br/>
            Час: <strong>{lastResult?.timeSpentSec ?? 0} сек</strong><br/>
            Помилки: <strong>{(lastResult?.wrongLetters || []).join(", ") || "—"}</strong>
          </div>
        </div>

        <div className={styles.actions}>
          <Button onClick={() => navigate(`/u/${userId}/game`)}>Наступний тур</Button>
          <Button variant="ghost" onClick={() => navigate(`/u/${userId}/start`)}>На старт</Button>
        </div>

        <div className={styles.hint}>
          Якщо зайдеш на /result без завершення гри — результат може бути порожній, це нормально для демо state store.
        </div>
      </Card>
    </div>
  );
}
