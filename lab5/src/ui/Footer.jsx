import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>Лаба 5 • Redux Toolkit • Перевірка: Налаштування + Таблиця результатів</span>
      </div>
    </footer>
  );
}
