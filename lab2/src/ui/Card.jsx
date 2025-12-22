export default function Card({ title, subtitle, children, right }) {
  return (
    <section className="card">
      {(title || subtitle || right) && (
        <div className="card__header">
          <div>
            {title && <h2 className="card__title">{title}</h2>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {right && <div className="card__right">{right}</div>}
        </div>
      )}
      <div className="card__body">{children}</div>
    </section>
  );
}
