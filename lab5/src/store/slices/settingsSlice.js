import { createSlice } from "@reduxjs/toolkit";

export const DEFAULT_SETTINGS = {
  playerName: "",
  difficulty: "normal",
  maxAttempts: 7,
  timeLimitSec: 0,
  tickMs: 1000,
  wordLengthMin: 3,
  wordLengthMax: 14,
};

const initialState = {
  byUser: {
    guest: { ...DEFAULT_SETTINGS },
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    ensureUser(state, action) {
      const userId = action.payload || "guest";
      if (!state.byUser[userId]) state.byUser[userId] = { ...DEFAULT_SETTINGS };
    },
    updateSettings(state, action) {
      const { userId, patch } = action.payload;
      if (!state.byUser[userId]) state.byUser[userId] = { ...DEFAULT_SETTINGS };
      state.byUser[userId] = { ...state.byUser[userId], ...patch };
    },
    resetSettings(state, action) {
      const userId = action.payload;
      state.byUser[userId] = { ...DEFAULT_SETTINGS };
    },
  },
});

export const { ensureUser, updateSettings, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;

export const selectSettings = (state, userId) =>
  state.settings.byUser[userId] ?? DEFAULT_SETTINGS;
