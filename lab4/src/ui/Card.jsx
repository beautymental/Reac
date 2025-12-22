import styles from "./Card.module.css";

export default function Card({ title, subtitle, children, right }) {
  return (
    <section className={styles.card}>
      {(title || subtitle || right) && (
        <div className={styles.header}>
          <div>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {right && <div>{right}</div>}
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  );
}
