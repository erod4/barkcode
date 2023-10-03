import { createContext, useReducer } from "react";
import axios from "axios";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  DELETE_PROFILE,
  DELETE_PROFILE_FAIL,
} from "./AuthActionTyes";
import {
  API_URL_PROFILE,
  API_URL_REGISTER,
  API_URL_USER,
} from "../../utils/apiURL";

//auth context
export const authContext = createContext();
//initial state
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth") || null),
  error: null,
  loading: false,
  profile: null,
};
//Auth reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    //add user to local storage
    case LOGIN_SUCCESS:
      //Add user to localstorage
      localStorage.setItem("userAuth", JSON.stringify(payload));

      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
        userAuth: null,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        profile: payload,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case LOGOUT:
      //Delete user from localstorage
      localStorage.removeItem("userAuth");
      return {
        ...state,
        error: null,
        loading: false,
        profile: null,
        userAuth: null,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return {
        ...state,
        error: null,
        loading: false,
        userAuth: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        userAuth: null,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        error: null,
        loading: false,
        profile: payload,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case DELETE_PROFILE:
      localStorage.removeItem("userAuth");
      return {
        ...state,
        error: null,
        loading: false,
        profile: null,
        userAuth: null,
      };
    case DELETE_PROFILE_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
//provider
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  //login action
  const loginUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${API_URL_USER}/login`, formData, config);
      if (res?.data?.status === "success") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      }
      //Redirect
      window.location.href = "#/home";
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
  const fetchProfileAction = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.userAuth?.token}`,
        },
      };
      const res = await axios.get(`${API_URL_USER}/profile`, config);
      if (res?.data) {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
  const registerUserAction = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(API_URL_REGISTER, formData, config);

      if (res?.data?.status === "success") {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      }
      window.location.href = "#/home";
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
  //log out user
  const logoutUserAction = async () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });

    window.location.href = "/";
  };

  const updateUserAction = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.userAuth?.token}`,
        },
      };
      const res = await axios.put(API_URL_USER, formData, config);
      if (res?.data?.status === "sucesss") {
        dispatch({
          type: UPDATE_PROFILE,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  const deleteUserAction = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.userAuth?.token}`,
        },
      };
      const res = await axios.delete(API_URL_USER, config);
      if (res?.data?.status === "sucesss") {
        dispatch({
          type: DELETE_PROFILE,
          payload: res.data,
        });
      }
      window.location.href = "/";
    } catch (error) {
      dispatch({
        type: DELETE_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
  return (
    <authContext.Provider
      value={{
        deleteUserAction,
        registerUserAction,
        logoutUserAction,
        updateUserAction,
        loginUserAction,
        userAuth: state,
        token: state?.userAuth?.token,
        fetchProfileAction,
        profile: state?.profile,
        error: state?.error,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;
