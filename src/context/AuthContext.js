import { createDataContext } from "./createDataContext";
import disasterApi from "../api/disasterApi";

const reducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { ...state, token: action.payload };
    case "getUser":
      return { ...state, user: action.payload };
    case "signout":
      return { user: null, errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error":
      return { ...state, errorMessage: "" };
    case "loading":
      return { ...state, isLoadingInAuth: true };
    case "loaded":
      return { ...state, isLoadingInAuth: false };
    default:
      return state;
  }
};

const signin = (dispatch) => async ({ username, password }) => {
  try {
    dispatch({ type: "loading" });
    const response = await disasterApi.post("/admin/signin", {
      username,
      password,
    });
    const token = response.data.token;
    dispatch({ type: "loaded" });
    dispatch({ type: "signin", payload: token });
    localStorage.setItem("token", JSON.stringify(token));
  } catch (error) {
    console.log("error in sign " + error.message);
    dispatch({ type: "add_error", payload: "Signing in failed." });
  }
  dispatch({ type: "loaded" });
};

const createAdmin = (dispatch) => async ({ username, password }) => {
  try {
    await disasterApi.post("/admin/create", {
      username,
      password,
    });
  } catch (error) {
    dispatch({ type: "add_error", payload: "Creating Admin failed." });
  }
};

const signout = (dispatch) => async () => {
  try {
    localStorage.removeItem("token");
    dispatch({ type: "signout" });
  } catch (err) {
    dispatch({ type: "add_error", payload: "Signing out failed." });
  }
};

const getUser = (dispatch) => async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    try {
      dispatch({ type: "loading" });
      const response = await disasterApi.get("/admin/getUser");
      dispatch({ type: "getUser", payload: response.data });
      dispatch({ type: "loaded" });
    } catch (error) {
      dispatch({ type: "add_error", payload: "Getting user failed." });
    }
  } else {
    dispatch({ type: "loaded" });
  }
};

const clearError = (dispatch) => () => {
  dispatch({ type: "clear_error" });
};

export const { Context, Provider } = createDataContext(
  reducer,
  { signin, signout, createAdmin, getUser, clearError },
  { user: null, token: null, errorMessage: "", isLoadingInAuth: true }
);
