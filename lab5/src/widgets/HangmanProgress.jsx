import Badge from "../ui/Badge.jsx";
import styles from "./HangmanProgress.module.css";
export default function HangmanProgress({ attemptsLeft, maxAttempts }){
  const used = Math.max(0, (maxAttempts ?? 0) - (attemptsLeft ?? 0));
  const total = maxAttempts ?? 0;
  return (
    <div className={styles.progress}>
      <div className={styles.row}>
        <span>Залишилось спроб:</span>
        <Badge tone={attemptsLeft <= 2 ? "danger" : "info"}>{attemptsLeft}/{total}</Badge>
      </div>
      <div className={styles.bar}><div className={styles.fill} style={{ width: total === 0 ? "0%" : `${(used/total)*100}%` }} /></div>
      <div className={styles.hint}>Помилок зроблено: <strong>{used}</strong></div>
    </div>
  );
}
