import axios from "axios";
import { toast } from "react-toastify";
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
    toast.success("Login successfully", {
      position: "top-right",
    });
    if (res.data.user?.role === "Admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  } catch (err) {
    dispatch(loginFailed());
    toast.error(err.response.data.message, {
      position: "top-right",
    });
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());

  try {
    const res = await axios.post(
      "https://pet-shop-mini.herokuapp.com/api/register",
      user
    );
    console.log(user);
    dispatch(registerSuccess(res.data));
    toast.success("Register successfully", {
      position: "top-right",
    });

    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
    toast.error(err.response.data.message, {
      position: "top-right",
    });
  }
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
    toast.success("Delete this user successfully", {
      position: "top-right",
    });
    getAllUsers(accessToken, dispatch);
  } catch (error) {
    console.log(error.response.data);
    dispatch(deleteUserFailed(error.response.data));
    toast.error(error.response.data.message, {
      position: "top-right",
    });
  }
};

export const logOut = async (navigate, dispatch) => {
  dispatch(logOutStart());
  try {
    dispatch(logOutSuccess());
    navigate("/login");
    toast.success("Logout successfully", {
      position: "top-right",
    });
  } catch (error) {
    dispatch(logOutFailed());
  }
};

export const updateUser = async (dispatch, accessToken, user) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.patch(
      `https://pet-shop-mini.herokuapp.com/api/user/update`,
      user,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    dispatch(updateUserSuccess(res.data));
    toast.success("Update this user successfully", {
      position: "top-right",
    });
    getAllUsers(accessToken, dispatch);
  } catch (error) {
    dispatch(updateUserFailed(error.response.data));
    toast.error(error.response.data.message, {
      position: "top-right",
    });
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
    toast.error(err.response.data.message, {
      position: "top-right",
    });
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
    toast.success("Update category success", {
      position: "top-right",
    });
    getAllCategory(dispatch);
  } catch (error) {
    dispatch(updateCateFailed(error.response.data));
    toast.error(error.response.data.message, {
      position: "top-right",
    });
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
    toast.success("Delete category success", {
      position: "top-right",
    });
    getAllCategory(dispatch);
  } catch (error) {
    console.log(error.response.data);
    dispatch(deleteCateFailed(error.response.data));
    toast.error(error.response.data.message, {
      position: "top-right",
    });
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
    .then(() =>
      dispatch(
        createNewCateSuccess(),
        toast.success("Create new category successfully", {
          position: "top-right",
        }),
        getAllCategory(dispatch)
      )
    )
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
    toast.success("Delete pet successfully", {
      position: "top-right",
    });
    getAllPets(dispatch);
  } catch (error) {
    console.log(error.response.data);
    dispatch(deletePetFailed(error.response.data));
    toast.error(error.response.data.message, {
      position: "top-right",
    });
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
