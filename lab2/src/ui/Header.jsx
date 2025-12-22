import Button from "./Button.jsx";

export default function Header({ title, subtitle, onGoHome }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__titles">
          <h1 className="header__title">{title}</h1>
          <p className="header__subtitle">{subtitle}</p>
        </div>

        <div className="header__actions">
          <Button variant="ghost" onClick={onGoHome}>
            На старт
          </Button>
        </div>
      </div>
    </header>
  );
}
