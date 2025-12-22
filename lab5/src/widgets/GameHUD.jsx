import Badge from "../ui/Badge.jsx";
import styles from "./GameHUD.module.css";
export default function GameHUD({ playerName, difficulty, timer }){
  return (
    <div className={styles.hud}>
      <div className={styles.item}>
        <span className={styles.label}>Гравець</span>
        <span className={styles.value}>{playerName || "Гість"}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Складність</span>
        <Badge tone="info">{difficulty}</Badge>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Таймер</span>
        {timer?.enabled ? (
          <Badge tone={timer.timeLeftSec <= 5 ? "danger" : "info"}>{timer.timeLeftSec} сек</Badge>
        ) : (
          <Badge tone="neutral">вимкнено</Badge>
        )}
      </div>
    </div>
  );
}
