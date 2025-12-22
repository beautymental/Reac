import Modal from "../ui/Modal.jsx";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";
import styles from "./EndGameDialog.module.css";

export default function EndGameDialog({ isOpen, summary, onClose, onNextRound, onRetry, onGoResult, onGoStart }) {
  const isWin = summary?.status === "win";
  return (
    <Modal
      isOpen={isOpen}
      title={isWin ? "Перемога!" : "Гру завершено"}
      onClose={onClose}
      actions={
        <>
          <Button onClick={onNextRound}>Наступний тур</Button>
          <Button variant="ghost" onClick={onRetry}>Цей тур заново</Button>
          <Button variant="ghost" onClick={onGoResult}>Деталі</Button>
          <Button variant="danger" onClick={onGoStart}>На старт</Button>
        </>
      }
    >
      <div className={styles.info}>
        <div className={styles.row}>
          <span>Статус:</span> <Badge tone={isWin ? "success" : "danger"}>{isWin ? "WIN" : "LOSE"}</Badge>
        </div>
        <div className={styles.row}><span>Слово:</span> <strong>{summary?.word ?? "—"}</strong></div>
        <div className={styles.row}><span>Спроб використано:</span> <strong>{summary?.attemptsUsed ?? 0}</strong></div>
        <div className={styles.row}><span>Помилки:</span> <strong>{(summary?.wrongLetters || []).join(", ") || "—"}</strong></div>
        <div className={styles.row}><span>Час:</span> <strong>{summary?.timeSpentSec ?? 0} сек</strong></div>
      </div>
    </Modal>
  );
}
