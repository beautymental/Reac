import { Navigate, Route, Routes } from "react-router-dom";
import UserScopeLayout from "./routes/UserScopeLayout.jsx";
import StartPage from "./pages/StartPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import ResultPage from "./pages/ResultPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* default */}
      <Route path="/" element={<Navigate to="/u/guest/start" replace />} />

      {/* Dynamic routing by userId */}
      <Route path="/u/:userId" element={<UserScopeLayout />}>
        <Route path="start" element={<StartPage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="result" element={<ResultPage />} />
        <Route index element={<Navigate to="start" replace />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/u/guest/start" replace />} />
    </Routes>
  );
}
