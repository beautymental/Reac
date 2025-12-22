import { useState } from "react";
import AppLayout from "./layouts/AppLayout.jsx";
import StartPage from "./pages/StartPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import ResultPage from "./pages/ResultPage.jsx";

export default function App() {
  const [view, setView] = useState("start");
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [result, setResult] = useState({ status: "win", word: "REACT" });

  return (
    <AppLayout title="Hangman" subtitle="Lab 1 UI" onGoHome={() => setView("start")}>
      {view === "start" && (
        <StartPage
          playerName={playerName}
          difficulty={difficulty}
          onChangeName={setPlayerName}
          onChangeDifficulty={setDifficulty}
          onStart={() => setView("game")}
        />
      )}

      {view === "game" && (
        <GamePage
          playerName={playerName}
          difficulty={difficulty}
          onEndDemoWin={() => {
            setResult({ status: "win", word: "REACT" });
            setView("result");
          }}
          onEndDemoLose={() => {
            setResult({ status: "lose", word: "COMPONENT" });
            setView("result");
          }}
        />
      )}

      {view === "result" && (
        <ResultPage
          result={result}
          playerName={playerName}
          onPlayAgain={() => setView("game")}
          onBackToStart={() => setView("start")}
        />
      )}
    </AppLayout>
  );
}
