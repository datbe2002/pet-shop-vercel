import axios from "axios";
import {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
} from "./authSlice";
import { getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/api/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed(err.response.data));
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:8000/api/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("http://localhost:8000/api/user", {
      headers: { Authorization: "Bearer " + accessToken },
    });
    // console.log(res.data.users);
    dispatch(getUsersSuccess(res.data.users));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};
