import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
const petSlice = createSlice({
  name: "pet",
  initialState: {
    pet: {
      allPets: null,
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getPetStart: (state) => {
      state.pet.isFetching = true;
    },
    getPetSuccess: (state, action) => {
      state.pet.isFetching = false;
      state.pet.allPets = action.payload;
    },
    getPetFailed: (state) => {
      state.pet.isFetching = false;
      state.pet.error = true;
    },
    // updateCateStart: (state) => {
    //   state.category.isFetching = true;
    // },
    // updateCateSuccess: (state, action) => {
    //   state.category.isFetching = false;
    // },
    // updateCateFailed: (state) => {
    //   state.category.isFetching = false;
    //   state.category.error = true;
    // },
    deletePetStart: (state) => {
      state.pet.isFetching = true;
    },
    deletePetSuccess: (state, action) => {
      state.pet.isFetching = false;
    },
    deletePetFailed: (state, action) => {
      state.pet.isFetching = false;
      state.pet.error = true;
    },
    // createNewCateStart: (state) => {
    //   state.category.isFetching = true;
    // },
    // createNewCateSuccess: (state, action) => {
    //   state.category.isFetching = false;
    //   state.category.error = false;
    // },
    // createNewCateFailed: (state, action) => {
    //   state.category.isFetching = false;
    //   state.category.error = true;
    // },
  },
});

export const {
  getPetStart,
  getPetSuccess,
  getPetFailed,
  //   updateCateStart,
  //   updateCateSuccess,
  //   updateCateFailed,
  deletePetStart,
  deletePetSuccess,
  deletePetFailed,
  //   createNewCateStart,
  //   createNewCateSuccess,
  //   createNewCateFailed,
} = petSlice.actions;
export default petSlice.reducer;
