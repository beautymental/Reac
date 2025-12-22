import { createPortal } from "react-dom";
import Button from "./Button.jsx";
import styles from "./Modal.module.css";

export default function Modal({ isOpen, title, children, onClose, actions }) {
  if (!isOpen) return null;
  const root = document.getElementById("modal-root");
  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>
        <div className={styles.body}>{children}</div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>,
    root
  );
}
