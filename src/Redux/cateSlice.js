import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: {
      allCates: null,
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getCateStart: (state) => {
      state.category.isFetching = true;
    },
    getCateSuccess: (state, action) => {
      state.category.isFetching = false;
      state.category.allCates = action.payload;
    },
    getCateFailed: (state) => {
      state.category.isFetching = false;
      state.category.error = true;
    },
    updateCateStart: (state) => {
      state.category.isFetching = true;
    },
    updateCateSuccess: (state, action) => {
      state.category.isFetching = false;
    },
    updateCateFailed: (state) => {
      state.category.isFetching = false;
      state.category.error = true;
    },
  },
});

export const {
  getCateStart,
  getCateSuccess,
  getCateFailed,
  updateCateStart,
  updateCateSuccess,
  updateCateFailed,
} = categorySlice.actions;
export default categorySlice.reducer;
