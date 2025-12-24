import Modal from "../ui/Modal.jsx";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";

export default function EndGameDialog({ modal, actions }) {
  const isWin = modal?.status === "win";
  const summary = modal?.summary;

  return (
    <Modal
      isOpen={!!modal?.isOpen}
      title={isWin ? "Перемога!" : "Гру завершено"}
      onClose={actions?.closeModal}
      actions={
        <>
          <Button onClick={actions?.nextRound}>Наступний тур</Button>
          <Button variant="ghost" onClick={actions?.retrySame}>Цей тур заново</Button>
          <Button variant="ghost" onClick={actions?.openResultPage}>Деталі</Button>
          <Button variant="danger" onClick={actions?.goStart}>На старт</Button>
        </>
      }
    >
      <div className="dialogInfo">
        <div className="dialogInfo__row">
          <span>Статус:</span>{" "}
          <Badge tone={isWin ? "success" : "danger"}>{isWin ? "WIN" : "LOSE"}</Badge>
        </div>
        <div className="dialogInfo__row">
          <span>Слово:</span> <strong>{summary?.word ?? "—"}</strong>
        </div>
        <div className="dialogInfo__row">
          <span>Спроб використано:</span> <strong>{summary?.attemptsUsed ?? 0}</strong>
        </div>
        <div className="dialogInfo__row">
          <span>Помилки:</span> <strong>{(summary?.wrongLetters || []).join(", ") || "—"}</strong>
        </div>
        <div className="dialogInfo__row">
          <span>Час:</span> <strong>{summary?.timeSpentSec ?? 0} сек</strong>
        </div>
      </div>
      <div className="hint" style={{ marginTop: 12 }}>
       <strong>React Portal</strong> 
      </div>
    </Modal>
  );
}
