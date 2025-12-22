import Badge from "../ui/Badge.jsx";

export default function GameHUD({ playerName, difficulty, timer }) {
  return (
    <div className="hud">
      <div className="hud__item">
        <span className="hud__label">Гравець</span>
        <span className="hud__value">{playerName || "Гість"}</span>
      </div>

      <div className="hud__item">
        <span className="hud__label">Складність</span>
        <Badge tone="info">{difficulty}</Badge>
      </div>

      <div className="hud__item">
        <span className="hud__label">Таймер</span>
        {timer?.enabled ? (
          <Badge tone={timer.timeLeftSec <= 5 ? "danger" : "info"}>
            {timer.timeLeftSec} сек
          </Badge>
        ) : (
          <Badge tone="neutral">вимкнено</Badge>
        )}
      </div>
    </div>
  );
}
