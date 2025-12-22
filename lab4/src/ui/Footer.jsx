import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>Лаба 4 • Роутинг + CSS Modules + State Management</span>
      </div>
    </footer>
  );
}
