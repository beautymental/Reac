import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import { clearResults, selectResults } from "../store/slices/resultsSlice.js";
import styles from "./ResultsTablePage.module.css";

function formatTime(iso){
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}

export default function ResultsTablePage(){
  const { userId="guest" } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const results = useSelector((s) => selectResults(s, userId));

  const stats = useMemo(() => {
    const total = results.length;
    const wins = results.filter(r => r.status === "win").length;
    const loses = results.filter(r => r.status === "lose").length;
    return { total, wins, loses };
  }, [results]);

  return (
    <div className={styles.stack}>
      <Card
        title="Таблиця результатів"
        subtitle="Перевірка Lab 5: дані беруться зі state manager (Redux Toolkit)."
        right={<Badge tone="info">/u/:userId/results</Badge>}
      >
        <div className={styles.topBar}>
          <div className={styles.counters}>
            <Badge tone="neutral">всього: {stats.total}</Badge>
            <Badge tone="success">win: {stats.wins}</Badge>
            <Badge tone="danger">lose: {stats.loses}</Badge>
          </div>
          <div className={styles.actions}>
            <Button variant="ghost" onClick={() => navigate(`/u/${userId}/start`)}>Налаштування</Button>
            <Button onClick={() => navigate(`/u/${userId}/game`)}>Грати</Button>
            <Button variant="danger" onClick={() => dispatch(clearResults(userId))} disabled={results.length === 0}>
              Очистити
            </Button>
          </div>
        </div>

        {results.length === 0 ? (
          <div className={styles.empty}>
            Поки що немає результатів. Зіграйте раунд, і записи з'являться тут.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Статус</th>
                  <th>Слово</th>
                  <th>Спроб</th>
                  <th>Час (сек)</th>
                  <th>Помилки</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id}>
                    <td className={styles.muted}>{formatTime(r.createdAt)}</td>
                    <td>
                      <Badge tone={r.status === "win" ? "success" : "danger"}>
                        {r.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className={styles.word}>{r.word}</td>
                    <td>{r.attemptsUsed}</td>
                    <td>{r.timeSpentSec ?? 0}</td>
                    <td className={styles.muted}>{(r.wrongLetters || []).join(", ") || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className={styles.hint}>
          Дані зберігаються в <strong>localStorage</strong> (persist store). Для іншого userId — інші результати.
        </div>
      </Card>
    </div>
  );
}
