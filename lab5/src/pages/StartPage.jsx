import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import SettingsForm from "../widgets/SettingsForm.jsx";
import styles from "./StartPage.module.css";
import { useDispatch } from "react-redux";
import { ensureUser } from "../store/slices/settingsSlice.js";
import { ensureUser as ensureResultsUser } from "../store/slices/resultsSlice.js";

export default function StartPage(){
  const { userId="guest" } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ensureUser(userId));
    dispatch(ensureResultsUser(userId));
  }, [dispatch, userId]);

  return (
    <div className={styles.stack}>
      <Card
        title="Налаштування"
        subtitle="Lab 5: стан організовано через Redux Toolkit (перевірка тут і в таблиці результатів)"
        right={<Badge tone="info">/u/:userId/start</Badge>}
      >
        <SettingsForm />

        <div className={styles.actions}>
          <Button onClick={() => navigate(`/u/${userId}/game`)}>Почати гру</Button>
          <Button variant="ghost" onClick={() => navigate(`/u/${userId}/results`)}>Таблиця результатів</Button>
        </div>

        <div className={styles.hint}>
          Зміни <strong>userId</strong> в URL (наприклад <code>/u/olexandr/start</code>) — Redux зберігає дані окремо для кожного userId.
        </div>
      </Card>
    </div>
  );
}
