import Badge from "../ui/Badge.jsx";

export default function WrongLetters({ letters }) {
  const list = letters || [];
  return (
    <div className="wrongLetters">
      <span className="wrongLetters__label">Помилки:</span>
      {list.length === 0 ? (
        <Badge tone="neutral">немає</Badge>
      ) : (
        <div className="wrongLetters__list">
          {list.map((l) => (
            <Badge key={l} tone="danger">{l}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}
