import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "PokeDéx",
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = generalSlice.actions;
export default generalSlice.reducer;
