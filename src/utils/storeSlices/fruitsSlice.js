import { createSlice } from "@reduxjs/toolkit";

const fruitsSlice = createSlice({
  name: "fruits",
  initialState: {
    list: [],
    filteredList: [],
    selectedFruit: null,
    selectedSortOption: "name",
    selectedSeason: "all",
  },
  reducers: {
    addFruit: (state, action) => {
      state.list.push(action.payload);
    },
    updateFruit: (state, action) => {
      const { id, updatedFruit } = action.payload;
      state.list = state.list.map((fruit) =>
        fruit.id === id ? { ...fruit, ...updatedFruit } : fruit
      );
    },
    removeFruit: (state, action) => {
      state.list = state.list.filter((fruit) => fruit.id !== action.payload);
      state.selectedFruit = null;
    },
    setFruitList: (state, action) => {
      state.list = action.payload;
    },
    setSelectedFruit: (state, action) => {
      state.selectedFruit = action.payload;
    },
    getFruitByName: (state, action) => {
      const fruitName = action.payload;
      const selectedFruit = state.list.find(
        (fruit) => fruit.name.toLowerCase() === fruitName.toLowerCase()
      );
      state.selectedFruit = selectedFruit || null;
    },
    setFilteredList: (state, action) => {
      state.filteredList = action.payload;
    },
    setSelectedSortOption: (state, action) => {
      state.selectedSortOption = action.payload;
    },
    setSelectedSeason: (state, action) => {
      state.selectedSeason = action.payload;
    },
    setFruitAndFilterList: (state, action) => {
      state.list = action.payload.list;
      state.filteredList = action.payload.filteredList;
    },
  },
});

export const {
  addFruit,
  updateFruit,
  removeFruit,
  setFruitList,
  setFilteredList,
  setSelectedFruit,
  setSelectedSortOption,
  setFruitAndFilterList,
  setSelectedSeason,
  getFruitByName,
} = fruitsSlice.actions;

export const selectFruitList = (state) => state.fruits.list;
export const selectFilteredList = (state) => state.fruits.filteredList;
export const selectSelectedFruit = (state) => state.fruits.selectedFruit;
export const selectSelectedSortOption = (state) =>
  state.fruits.selectedSortOption;

export default fruitsSlice.reducer;
