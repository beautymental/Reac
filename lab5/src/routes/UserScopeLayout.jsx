import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppLayout from "../layouts/AppLayout.jsx";
import useHeaderSubtitle from "../hooks/useHeaderSubtitle.js";
import { setActiveUser } from "../store/slices/appSlice.js";
import { ensureUser as ensureSettingsUser } from "../store/slices/settingsSlice.js";
import { ensureUser as ensureResultsUser } from "../store/slices/resultsSlice.js";

export default function UserScopeLayout() {
  const { userId = "guest" } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subtitle = useHeaderSubtitle();

  useEffect(() => {
    dispatch(setActiveUser(userId));
    dispatch(ensureSettingsUser(userId));
    dispatch(ensureResultsUser(userId));
  }, [dispatch, userId]);

  return (
    <AppLayout
      title="Hangman"
      subtitle={subtitle}
      onGoHome={() => navigate(`/u/${userId}/start`)}
      userId={userId}
      onGoResults={() => navigate(`/u/${userId}/results`)}
    >
      <Outlet />
    </AppLayout>
  );
}
