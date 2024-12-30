import { createSlice } from "@reduxjs/toolkit";

const initialState = { positions: [], searchedItems: [] };

const positionsSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    searchItems: (state, action) => {
      state.searchedItems = action.payload;
    },
    clearSearchItems: (state) => {
      state.searchedItems = [];
    },
  },
});

export const { setPositions, searchItems, clearSearchItems } =
  positionsSlice.actions;

export default positionsSlice.reducer;
