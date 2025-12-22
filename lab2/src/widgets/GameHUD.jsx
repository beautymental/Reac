import Badge from "../ui/Badge.jsx";

export default function GameHUD({ playerName, difficulty }) {
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
    </div>
  );
}
