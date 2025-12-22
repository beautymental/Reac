import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";

export default function StartPage({
  playerName,
  difficulty,
  onChangeName,
  onChangeDifficulty,
  onStart,
}) {
  return (
    <div className="stack">
      <Card
        title="Старт"
        subtitle="Обери складність та починай. Бізнес-логіка підключена через хуки."
        right={<Badge tone="info">LAB 2</Badge>}
      >
        <div className="grid">
          <label className="field">
            <span className="field__label">Імʼя гравця</span>
            <input
              className="input"
              value={playerName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="Напр. Олександр"
            />
          </label>

          <label className="field">
            <span className="field__label">Складність</span>
            <select
              className="input"
              value={difficulty}
              onChange={(e) => onChangeDifficulty(e.target.value)}
            >
              <option value="easy">Easy (8 спроб)</option>
              <option value="normal">Normal (7 спроб)</option>
              <option value="hard">Hard (6 спроб)</option>
            </select>
          </label>
        </div>

        <div className="actions">
          <Button onClick={onStart}>Почати гру</Button>
        </div>

        <div className="hint">
          Можеш грати мишкою по клавіатурі або натискати букви на фізичній
          клавіатурі.
        </div>
      </Card>
    </div>
  );
}
