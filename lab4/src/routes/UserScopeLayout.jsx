import { Outlet, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import { SettingsProvider } from "../state/SettingsContext.jsx";
import { GameProvider } from "../state/GameContext.jsx";
import useHeaderSubtitle from "../hooks/useHeaderSubtitle.js";

export default function UserScopeLayout() {
  const { userId = "guest" } = useParams();
  const navigate = useNavigate();
  const subtitle = useHeaderSubtitle();

  return (
    <SettingsProvider userId={userId}>
      <GameProvider userId={userId}>
        <AppLayout
          title="Hangman"
          subtitle={subtitle}
          onGoHome={() => navigate(`/u/${userId}/start`)}
          userId={userId}
        >
          <Outlet />
        </AppLayout>
      </GameProvider>
    </SettingsProvider>
  );
}
