import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => action.payload,
    removeUser: () => {
      return initialState;
    },
    logout: () => initialState,
  },
});

export const { addUser, removeUser, logout } = userSlice.actions;
export default userSlice.reducer;
