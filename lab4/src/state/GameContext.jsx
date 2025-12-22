import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

const GameContext = createContext(null);

const initial = {
  lastResult: null, // {status, word, attemptsUsed, wrongLetters, timeSpentSec}
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_RESULT":
      return { ...state, lastResult: action.payload };
    case "CLEAR_RESULT":
      return { ...state, lastResult: null };
    default:
      return state;
  }
}

export function GameProvider({ children, userId }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const setLastResult = useCallback((res) => dispatch({ type: "SET_RESULT", payload: res }), []);
  const clearLastResult = useCallback(() => dispatch({ type: "CLEAR_RESULT" }), []);

  const value = useMemo(() => ({ ...state, setLastResult, clearLastResult, userId }), [state, setLastResult, clearLastResult, userId]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameStore() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameStore must be used within GameProvider");
  return ctx;
}
