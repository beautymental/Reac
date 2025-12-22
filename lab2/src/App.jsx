import AppLayout from "./layouts/AppLayout.jsx";
import StartPage from "./pages/StartPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import useHangmanApp from "./hooks/useHangmanApp.js";

export default function App() {
  const {
    view,
    settings,
    game,
    result,
    actions,
    headerSubtitle,
  } = useHangmanApp();

  return (
    <AppLayout title="Hangman" subtitle={headerSubtitle} onGoHome={actions.goStart}>
      {view === "start" && (
        <StartPage
          playerName={settings.playerName}
          difficulty={settings.difficulty}
          onChangeName={actions.setPlayerName}
          onChangeDifficulty={actions.setDifficulty}
          onStart={actions.startGame}
        />
      )}

      {view === "game" && (
        <GamePage
          playerName={settings.playerName}
          difficulty={settings.difficulty}
          maskedWord={game.maskedWord}
          attemptsLeft={game.attemptsLeft}
          maxAttempts={game.maxAttempts}
          wrongLetters={game.wrongLetters}
          guessedLetters={game.guessedLetters}
          status={game.status}
          onGuess={actions.guessLetter}
          onGiveUp={actions.giveUp}
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
