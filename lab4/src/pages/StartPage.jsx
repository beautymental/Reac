import { useNavigate, useParams } from "react-router-dom";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import SettingsForm from "../widgets/SettingsForm.jsx";
import styles from "./StartPage.module.css";

export default function StartPage() {
  const { userId = "guest" } = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles.stack}>
      <Card
        title="Налаштування"
        subtitle="Lab 4: роутинг між сторінками + CSS Modules + state management"
        right={<Badge tone="info">/u/:userId/start</Badge>}
      >
        <SettingsForm />

        <div className={styles.actions}>
          <Button onClick={() => navigate(`/u/${userId}/game`)}>Почати гру</Button>
        </div>

        <div className={styles.hint}>
          Зміни <strong>userId</strong> прямо в адресі браузера: <code>/u/olexandr/start</code> —
          налаштування зберігаються окремо для кожного користувача.
        </div>
      </Card>
    </div>
  );
}
