import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUserId: "guest",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveUser(state, action) {
      state.activeUserId = action.payload || "guest";
    },
  },
});

export const { setActiveUser } = appSlice.actions;
export default appSlice.reducer;
