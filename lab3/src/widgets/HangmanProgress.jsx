import Badge from "../ui/Badge.jsx";

export default function HangmanProgress({ attemptsLeft, maxAttempts }) {
  const used = Math.max(0, (maxAttempts ?? 0) - (attemptsLeft ?? 0));
  const total = maxAttempts ?? 0;

  return (
    <div className="progress">
      <div className="progress__row">
        <span>Залишилось спроб:</span>
        <Badge tone={attemptsLeft <= 2 ? "danger" : "info"}>
          {attemptsLeft}/{total}
        </Badge>
      </div>

      <div className="progress__bar">
        <div className="progress__barFill" style={{ width: total === 0 ? "0%" : `${(used / total) * 100}%` }} />
      </div>

      <div className="progress__hint">
        Помилок зроблено: <strong>{used}</strong>
      </div>
    </div>
  );
}
