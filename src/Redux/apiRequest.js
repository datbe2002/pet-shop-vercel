import axios from "axios";
import {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/api/login", user);

    dispatch(loginSuccess(res.data));

    if (res.data.user?.role === "Admin") {
      navigate("/");
    } else {
      navigate("/user");
    }
  } catch (err) {
    dispatch(loginFailed(err.response.data));
  }
};

export const registerUser = (user, dispatch, navigate) => {
  dispatch(registerStart());

  axios
    .post("http://localhost:8000/api/register", user)
    .then(() => dispatch(registerSuccess()), navigate("/login"))
    .catch((err) => dispatch(registerFailed(err.response.data.message)));
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

export const deleteUser = async (id, accessToken, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete("http://localhost:8000/api/user/" + id, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    dispatch(deleteUserSuccess(res.data));
    getAllUsers(accessToken, dispatch);
  } catch (error) {
    dispatch(deleteUserFailed(error.response.data));
  }
};
export const logOut = async (navigate, dispatch) => {
  dispatch(logOutStart());
  try {
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(logOutFailed());
  }
};
