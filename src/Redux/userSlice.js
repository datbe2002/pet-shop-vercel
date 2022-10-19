import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: {
      allUsers: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = false;
    },
    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
  },
});

export const { getUsersStart, getUsersSuccess, getUsersFailed } =
  userSlice.actions;
export default userSlice.reducer;
