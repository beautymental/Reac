import AppLayout from "./layouts/AppLayout.jsx";
import StartPage from "./pages/StartPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import useHangmanApp from "./hooks/useHangmanApp.js";

export default function App() {
  const { view, settings, game, result, actions, headerSubtitle, modal } = useHangmanApp();

  return (
    <AppLayout title="Hangman" subtitle={headerSubtitle} onGoHome={actions.goStart}>
      {view === "start" && <StartPage onStart={actions.startGame} />}

      {view === "game" && (
        <GamePage
          settings={settings}
          game={game}
          onGuess={actions.guessLetter}
          onGiveUp={actions.giveUp}
          modal={modal}
          modalActions={actions.modalActions}
        />
      )}

      {view === "result" && (
        <ResultPage
          result={result}
          playerName={settings.playerName}
          onPlayAgain={actions.playAgain}
          onBackToStart={actions.goStart}
        />
      )}
    </AppLayout>
  );
}
