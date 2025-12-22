import styles from "./Button.module.css";

export default function Button({ variant = "primary", type = "button", onClick, children, disabled }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles["btn_" + variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
