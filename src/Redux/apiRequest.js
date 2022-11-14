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
  createNewCateFailed,
  createNewCateStart,
  createNewCateSuccess,
  deleteCateFailed,
  deleteCateStart,
  deleteCateSuccess,
  getCateFailed,
  getCateStart,
  getCateSuccess,
  updateCateFailed,
  updateCateStart,
  updateCateSuccess,
} from "./cateSlice";
import {
  createNewPetFailed,
  createNewPetStart,
  createNewPetSuccess,
  deletePetFailed,
  deletePetStart,
  deletePetSuccess,
  getPetFailed,
  getPetStart,
  getPetSuccess,
  updatePetFailed,
  updatePetStart,
  updatePetSuccess,
} from "./petSlice";
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

axios.defaults.headers.post["Content-Type"] = "application/json";

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

//=================================================================

export const getAllCategory = async (dispatch) => {
  dispatch(getCateStart());
  try {
    const res = await axios.get(
      "https://pet-shop-mini.herokuapp.com/api/category"
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

export const deleteCategory = async (id, accessToken, dispatch) => {
  dispatch(deleteCateStart());
  try {
    const res = await axios.delete(
      `https://pet-shop-mini.herokuapp.com/api/category/${id}`,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    dispatch(deleteCateSuccess(res.data));
    getAllCategory(dispatch);
  } catch (error) {
    console.log(error.response.data);
    dispatch(deleteCateFailed(error.response.data));
  }
};

export const createCategory = (dispatch, category, accessToken) => {
  dispatch(createNewCateStart());

  axios
    .post("https://pet-shop-mini.herokuapp.com/api/category", category, {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(() => dispatch(createNewCateSuccess(), getAllCategory(dispatch)))
    .catch((err) => dispatch(createNewCateFailed()));
};

//====================================================================

export const getAllPets = async (dispatch) => {
  dispatch(getPetStart());
  try {
    const res = await axios.get("https://pet-shop-mini.herokuapp.com/api/pet");
    dispatch(getPetSuccess(res.data));
  } catch (err) {
    dispatch(getPetFailed(err.response.data));
  }
};

export const deletePet = async (id, dispatch) => {
  dispatch(deletePetStart());
  try {
    const res = await axios.delete(
      `https://pet-shop-mini.herokuapp.com/api/pet/${id}`
    );
    dispatch(deletePetSuccess(res.data));
    getAllPets(dispatch);
  } catch (error) {
    console.log(error.response.data);
    dispatch(deletePetFailed(error.response.data));
  }
};

export const updatePet = async (dispatch, pet) => {
  dispatch(updatePetStart());
  try {
    const res = await axios.patch(
      `https://pet-shop-mini.herokuapp.com/api/pet/update`,
      pet
    );
    dispatch(updatePetSuccess(res.data));
    getAllPets(dispatch);
  } catch (error) {
    dispatch(updatePetFailed(error.response.data));
  }
};

export const createpet = (dispatch, pet, accessToken) => {
  dispatch(createNewPetStart());

  axios
    .post("https://pet-shop-mini.herokuapp.com/api/pet", pet, {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(() => dispatch(createNewPetSuccess(), getAllPets(dispatch)))
    .catch((err) => dispatch(createNewPetFailed()));
};
