import Button from "./Button.jsx";
import Badge from "./Badge.jsx";
import styles from "./Header.module.css";

export default function Header({ title, subtitle, onGoHome, userId }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.titles}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.actions}>
          <Badge tone="info">user: {userId}</Badge>
          <Button variant="ghost" onClick={onGoHome}>
            На старт
          </Button>
        </div>
      </div>
    </header>
  );
}
