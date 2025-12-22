import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice.js";
import settingsReducer from "./slices/settingsSlice.js";
import resultsReducer from "./slices/resultsSlice.js";
import { loadState, saveState } from "./storage.js";

const preloaded = loadState();

export const store = configureStore({
  reducer: {
    app: appReducer,
    settings: settingsReducer,
    results: resultsReducer,
  },
  preloadedState: preloaded,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: ["settings/setActiveUser", "results/setActiveUser"],
      },
    }),
});

store.subscribe(() => {
  // Зберігаємо весь store (простий варіант для лаби)
  saveState(store.getState());
});
