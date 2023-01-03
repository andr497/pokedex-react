import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAbilityById } from "./../api/abilities";

const initialState = {
  loading: false,
  data: null,
  error: false,
};

export const getAbilityById = createAsyncThunk(
  "ability/getAbilityId",
  async (id) => {
    const response = await fetchAbilityById(id);

    return {
      ...response.data,
    };
  }
);

export const abilitySlice = createSlice({
  name: "ability",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAbilityById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAbilityById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAbilityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const selectDataAbility = (state) => state.ability.data;

export default abilitySlice.reducer;
