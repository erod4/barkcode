import { createContext, useReducer } from "react";
import axios from "axios";
import {
  CODE_SENT_FAIL,
  CODE_SENT_SUCCESS,
  CODE_VERIFIED_FAIL,
  CODE_VERIFIED_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
} from "./ResetPassActionTypes";
import {
  API_URL_RESET,
  API_URL_USER,
  API_URL_VERIFY_RESET,
} from "../../utils/apiURL";

export const ResetPassContext = createContext();
const INITIAL_STATE = {
  resetCode: false,
  resetCodeVerified: JSON.parse(localStorage.getItem("userAuth") || null),
  resetSuccess: false,
  error: null,
};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CODE_SENT_SUCCESS:
      return {
        ...state,
        resetCode: true,
        resetCodeVerified: null,
        resetSuccess: false,
        error: null,
      };
    case CODE_SENT_FAIL:
      return {
        ...state,
        resetCode: false,
        resetCodeVerified: null,
        resetSuccess: false,
        error: payload,
      };
    case CODE_VERIFIED_SUCCESS:
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return {
        ...state,
        resetCode: false,
        resetCodeVerified: payload,
        resetSuccess: false,
        error: null,
      };
    case CODE_VERIFIED_FAIL:
      return {
        ...state,
        resetCode: false,
        resetCodeVerified: null,
        resetSuccess: false,
        error: payload,
      };
    case PASSWORD_RESET_SUCCESS:
      localStorage.removeItem("userAuth");
      return {
        ...state,
        resetCode: false,
        resetCodeVerified: null,
        resetSuccess: false,
        error: null,
      };
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        resetCode: false,
        resetCodeVerified: null,
        resetSuccess: false,
        error: payload,
      };
    default:
      return state;
  }
};
const ResetPassContextProvider = ({ children }) => {
  const [state, updateState] = useReducer(reducer, INITIAL_STATE);

  const sendResetAction = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(API_URL_RESET, formData, config);
      if (res?.data?.status === "success") {
        updateState({
          type: CODE_SENT_SUCCESS,
          payload: res.data,
        });
        window.location.href = "#/enter-code";
      }
    } catch (error) {
      updateState({
        type: CODE_SENT_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  const verifyResetAction = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(API_URL_VERIFY_RESET, formData, config);
      if (res?.data?.status === "success") {
        updateState({
          type: CODE_VERIFIED_SUCCESS,
          payload: res.data,
        });

        window.location.href = "#/new-password";
      }
    } catch (error) {
      updateState({
        type: CODE_VERIFIED_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
  const resetPasswordAction = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.resetCodeVerified?.token}`,
        },
      };
      const res = await axios.put(API_URL_USER, formData, config);
      if (res?.data?.status === "success") {
        updateState({
          type: PASSWORD_RESET_SUCCESS,
          payload: res.data,
        });
        window.location.href = "#/login";
      }
    } catch (error) {
      updateState({
        type: PASSWORD_RESET_FAIL,
        payload: error?.response?.data?.message,
      });
      console.log(error);
    }
  };
  return (
    <ResetPassContext.Provider
      value={{ sendResetAction, verifyResetAction, resetPasswordAction }}
    >
      {children}
    </ResetPassContext.Provider>
  );
};
export default ResetPassContextProvider;
