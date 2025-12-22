import { useCallback, useState } from "react";

/**
 * Стан для Start сторінки (ім'я та складність).
 * Логіка винесена у хук, щоб сторінка була чистою.
 */
export default function useStartSettings() {
  const [playerName, setPlayerNameState] = useState("");
  const [difficulty, setDifficultyState] = useState("easy"); // easy | normal | hard

  const setPlayerName = useCallback((name) => setPlayerNameState(name), []);
  const setDifficulty = useCallback((d) => setDifficultyState(d), []);

  return { playerName, difficulty, setPlayerName, setDifficulty };
}
