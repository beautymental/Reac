import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import SettingsForm from "../widgets/SettingsForm.jsx";

export default function StartPage({ onStart }) {
  return (
    <div className="stack">
      <Card
        title="Налаштування"
        subtitle="Форма з валідацією (react-hook-form + yup). Дані зберігаються в localStorage."
        right={<Badge tone="info">LAB 3</Badge>}
      >
        <SettingsForm />
        <div className="actions">
          <Button onClick={onStart}>Почати гру</Button>
        </div>
        <div className="hint">
          Після зміни налаштувань вони зберігаються. Наступного разу сторінка підхопить їх з localStorage.
        </div>
      </Card>
    </div>
  );
}
