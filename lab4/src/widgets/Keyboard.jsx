import Button from "../ui/Button.jsx";
import styles from "./Keyboard.module.css";

const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

export default function Keyboard({ guessedLetters, wrongLetters, disabled, onGuess }) {
  const guessed = guessedLetters instanceof Set ? guessedLetters : new Set(guessedLetters || []);
  const wrong = new Set(wrongLetters || []);

  return (
    <div className={styles.keyboard}>
      {ROWS.map((row) => (
        <div className={styles.row} key={row}>
          {row.split("").map((ch) => {
            const isDone = guessed.has(ch) || wrong.has(ch);
            return (
              <Button
                key={ch}
                variant={wrong.has(ch) ? "danger" : isDone ? "ghost" : "primary"}
                disabled={disabled || isDone}
                onClick={() => onGuess?.(ch)}
              >
                {ch}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
