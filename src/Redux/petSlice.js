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
    updatePetStart: (state) => {
      state.pet.isFetching = true;
    },
    updatePetSuccess: (state, action) => {
      state.pet.isFetching = false;
    },
    updatePetFailed: (state) => {
      state.pet.isFetching = false;
      state.pet.error = true;
    },
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
    createNewPetStart: (state) => {
      state.pet.isFetching = true;
    },
    createNewPetSuccess: (state, action) => {
      state.pet.isFetching = false;
      state.pet.error = false;
    },
    createNewPetFailed: (state, action) => {
      state.pet.isFetching = false;
      state.pet.error = true;
    },
  },
});

export const {
  getPetStart,
  getPetSuccess,
  getPetFailed,
  updatePetStart,
  updatePetFailed,
  updatePetSuccess,
  deletePetStart,
  deletePetSuccess,
  deletePetFailed,
  createNewPetStart,
  createNewPetSuccess,
  createNewPetFailed,
} = petSlice.actions;
export default petSlice.reducer;
