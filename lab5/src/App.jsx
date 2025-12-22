import { Navigate, Route, Routes } from "react-router-dom";
import UserScopeLayout from "./routes/UserScopeLayout.jsx";
import StartPage from "./pages/StartPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import ResultsTablePage from "./pages/ResultsTablePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/u/guest/start" replace />} />

      <Route path="/u/:userId" element={<UserScopeLayout />}>
        <Route path="start" element={<StartPage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="results" element={<ResultsTablePage />} />
        <Route index element={<Navigate to="start" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/u/guest/start" replace />} />
    </Routes>
  );
}
