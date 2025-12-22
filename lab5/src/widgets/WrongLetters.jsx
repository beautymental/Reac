import Badge from "../ui/Badge.jsx";
import styles from "./WrongLetters.module.css";
export default function WrongLetters({ letters }){
  const list = letters || [];
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Помилки:</span>
      {list.length === 0 ? <Badge tone="neutral">немає</Badge> : (
        <div className={styles.list}>
          {list.map((l) => <Badge key={l} tone="danger">{l}</Badge>)}
        </div>
      )}
    </div>
  );
}
