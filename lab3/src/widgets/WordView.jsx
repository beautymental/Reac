export default function WordView({ maskedWord }) {
  const chars = String(maskedWord || "").split("");
  return (
    <div className="word">
      {chars.map((ch, idx) => {
        if (ch === " ") return <span key={idx} className="word__gap" />;
        if (ch === "-") return <span key={idx} className="word__cell">-</span>;
        return (
          <span key={idx} className="word__cell">
            {ch}
          </span>
        );
      })}
    </div>
  );
}
