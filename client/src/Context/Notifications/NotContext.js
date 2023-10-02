import { createContext, useContext, useReducer } from "react";
import { NOTIF_DELETE_FAILED, NOTIF_DELETE_SUCCESS } from "./notActionType";
import { API_URL_NOTIF } from "../../utils/apiURL";
import axios from "axios";
import { authContext } from "../../Context/Auth/AuthContext";

export const notifContext = createContext();

const INITIAL_STATE = {
  notfication: null,
  error: null,
  loading: false,
};

const notifReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case NOTIF_DELETE_SUCCESS:
      return {
        ...state,
        notfication: payload,
        error: null,
        loading: false,
      };
    case NOTIF_DELETE_FAILED:
      return {
        ...state,
        notfication: null,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export const NotifContextProvider = ({ children }) => {
  //we are passing our notification reducer to useReducer with an initial state
  const [state, dispatch] = useReducer(notifReducer, INITIAL_STATE);
  //we will then update our state by using dispatch to update it

  //we need userAuth to send token to back end
  const { userAuth } = useContext(authContext);
  const deleteNotifAction = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.delete(API_URL_NOTIF + id, config);
      if (res?.data?.status === "success") {
        dispatch({
          type: NOTIF_DELETE_SUCCESS,
          payload: res?.data,
        });
      }
      window.location.reload();
    } catch (error) {
      dispatch({
        type: NOTIF_DELETE_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
  return (
    <notifContext.Provider
      value={{
        deleteNotifAction,
        notfication: state?.notfication,
        error: state?.error,
      }}
    >
      {children}
    </notifContext.Provider>
  );
};
