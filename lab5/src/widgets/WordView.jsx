import styles from "./WordView.module.css";
export default function WordView({ maskedWord }){
  const chars = String(maskedWord || "").split("");
  return (
    <div className={styles.word}>
      {chars.map((ch, idx) => {
        if (ch === " ") return <span key={idx} className={styles.gap} />;
        if (ch === "-") return <span key={idx} className={styles.cell}>-</span>;
        return <span key={idx} className={styles.cell}>{ch}</span>;
      })}
    </div>
  );
}
