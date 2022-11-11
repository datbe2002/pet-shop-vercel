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
  getCateFailed,
  getCateStart,
  getCateSuccess,
  updateCateFailed,
  updateCateStart,
  updateCateSuccess,
} from "./cateSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
} from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://pet-shop-mini.herokuapp.com/api/login",
      user
    );
    console.log(user);
    dispatch(loginSuccess(res.data));

    if (res.data.user?.role === "Admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  } catch (err) {
    dispatch(loginFailed(err.response.data));
  }
};

export const registerUser = (user, dispatch, navigate) => {
  dispatch(registerStart());

  axios
    .post("https://pet-shop-mini.herokuapp.com/api/register", user)
    .then(
      () => dispatch(registerSuccess()),

      navigate("/login")
    )
    .catch((err) => dispatch(registerFailed()));
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get(
      "https://pet-shop-mini.herokuapp.com/api/user",
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    // console.log(res.data.users);

    dispatch(getUsersSuccess(res.data.users));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (id, accessToken, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete(
      `https://pet-shop-mini.herokuapp.com/api/user/${id}`,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    dispatch(deleteUserSuccess(res.data));
    getAllUsers(accessToken, dispatch);
  } catch (error) {
    console.log(error.response.data);
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

export const updateUser = async (dispatch, user) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.patch(
      `https://pet-shop-mini.herokuapp.com/api/user/update`,
      user
    );
    dispatch(updateUserSuccess(res.data));
    // getAllUsers(process.env.TOKEN, dispatch);
  } catch (error) {
    dispatch(updateUserFailed(error.response.data));
  }
};

export const getAllCategory = async (accessToken, dispatch) => {
  dispatch(getCateStart());
  try {
    const res = await axios.get(
      "https://pet-shop-mini.herokuapp.com/api/category",
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    dispatch(getCateSuccess(res.data));
  } catch (err) {
    dispatch(getCateFailed(err.response.data));
  }
};

export const updateCategory = async (dispatch, category) => {
  dispatch(updateCateStart());
  try {
    const res = await axios.patch(
      `https://pet-shop-mini.herokuapp.com/api/category/update`,
      category
    );
    dispatch(updateCateSuccess(res.data));
    // getAllCategory(process.env.TOKEN, dispatch);
  } catch (error) {
    dispatch(updateCateFailed(error.response.data));
  }
};
