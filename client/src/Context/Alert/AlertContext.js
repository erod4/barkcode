import { createContext, useReducer, useContext } from "react";
import axios from "axios";
import {
  ALERT_CREATION_SUCCESS,
  ALERT_CREATION_FAILED,
  ALERT_DELETE_SUCCESS,
  ALERT_DELETE_FAILED,
} from "./AlertActionTypes";
import { authContext } from "../../Context/Auth/AuthContext";
import { API_URL_ALERT } from "../../utils/apiURL";
export const AlertContext = createContext();
const INITIAL_STATE = {
  alert: null,
  error: null,
  loading: null,
};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALERT_CREATION_SUCCESS:
      return {
        ...state,
        alert: payload,
        loading: false,
        error: null,
      };
    case ALERT_CREATION_FAILED:
      return {
        ...state,
        alert: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const AlertContextProvider = ({ children }) => {
  const [state, updateState] = useReducer(reducer, INITIAL_STATE);
  const { userAuth } = useContext(authContext);
  const postAlertAction = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAuth?.userAuth?.token}`,
        },
      };
      const res = await axios.post(API_URL_ALERT, formData, config);
      if (res?.data?.status === "success") {
        updateState({
          type: ALERT_CREATION_SUCCESS,
          payload: res.data,
        });
        console.log(res);
      }
      window.location.href = "/home";
    } catch (error) {
      updateState({
        type: ALERT_CREATION_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
  const deleteAlertAction = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAuth?.userAuth?.token}`,
        },
      };

      const res = await axios.delete(API_URL_ALERT + id, config);
      if (res?.data?.status === "success") {
        updateState({
          type: ALERT_DELETE_SUCCESS,
          payload: res.data,
        });
      }
      window.location.reload();
    } catch (error) {
      updateState({
        type: ALERT_DELETE_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
  return (
    <AlertContext.Provider value={{ postAlertAction, deleteAlertAction }}>
      {children}
    </AlertContext.Provider>
  );
};
