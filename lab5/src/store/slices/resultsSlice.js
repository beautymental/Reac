import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  byUser: {
    guest: [],
  },
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    ensureUser(state, action) {
      const userId = action.payload || "guest";
      if (!state.byUser[userId]) state.byUser[userId] = [];
    },
    addResult: {
      reducer(state, action) {
        const { userId, entry } = action.payload;
        if (!state.byUser[userId]) state.byUser[userId] = [];
        state.byUser[userId].unshift(entry); // newest first
      },
      prepare({ userId, status, word, attemptsUsed, wrongLetters, timeSpentSec }) {
        return {
          payload: {
            userId,
            entry: {
              id: nanoid(),
              createdAt: new Date().toISOString(),
              status,
              word,
              attemptsUsed,
              wrongLetters,
              timeSpentSec,
            },
          },
        };
      },
    },
    clearResults(state, action) {
      const userId = action.payload;
      state.byUser[userId] = [];
    },
  },
});

export const { ensureUser, addResult, clearResults } = resultsSlice.actions;
export default resultsSlice.reducer;

export const selectResults = (state, userId) => state.results.byUser[userId] ?? [];
