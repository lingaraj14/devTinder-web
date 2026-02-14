import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    addConnectionList: (state, action) => action.payload,
    updateConnectionList: (state, action) => [...state, action.payload],
    removeConnectionList: () => initialState,
  },
});

export const { addConnectionList, updateConnectionList, removeConnectionList } =
  connectionSlice.actions;
export default connectionSlice.reducer;
