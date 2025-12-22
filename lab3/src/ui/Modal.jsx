import { createPortal } from "react-dom";
import Button from "./Button.jsx";

export default function Modal({ isOpen, title, children, onClose, actions }) {
  if (!isOpen) return null;
  const root = document.getElementById("modal-root");

  return createPortal(
    <div className="modalOverlay" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>
        <div className="modal__body">{children}</div>
        {actions && <div className="modal__actions">{actions}</div>}
      </div>
    </div>,
    root
  );
}
