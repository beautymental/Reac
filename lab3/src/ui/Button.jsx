export default function Button({ variant="primary", type="button", onClick, children, disabled }) {
  return (
    <button type={type} className={`btn btn--${variant}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
