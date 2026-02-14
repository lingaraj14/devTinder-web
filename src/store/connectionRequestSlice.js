import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [];
const connectionRequestSlice = createSlice({
  name: "connectRequest",
  initialState,
  reducers: {
    addConnectionRequestList: (state, action) => action.payload,
    clearConnectionRequestList: () => initialState,
    removeConnectionRequestList: (state, action) => {
      console.log("action.payload: ", action.payload);
      console.log("state: ", current(state));
      return state.filter((item) => item._id.toString() !== action.payload);
    },
  },
});

export const {
  addConnectionRequestList,
  clearConnectionRequestList,
  removeConnectionRequestList,
} = connectionRequestSlice.actions;
export default connectionRequestSlice.reducer;
