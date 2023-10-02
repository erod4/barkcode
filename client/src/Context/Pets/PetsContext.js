import { createContext, useContext, useReducer } from "react";
import {
  PET_DETAILS_SUCCESS,
  PET_DETAILS_FAILED,
  PET_CREATION_SUCCESS,
  PET_CREATION_FAILED,
  PET_DELETE_SUCCESS,
  PET_DELETE_FAILED,
  PET_UPDATE_SUCCESS,
  PET_UPDATE_FAILED,
} from "./petsActionTypes";
import { API_URL_PET } from "../../utils/apiURL";
import axios from "axios";
import { authContext } from "../../Context/Auth/AuthContext";
export const petContext = createContext();
//Initial State

const INITIAL_STATE = {
  pet: null,
  error: null,
  loading: false,
};

//reducer`
const petReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case PET_DETAILS_SUCCESS:
      return {
        ...state,
        pet: payload,
        loading: false,
        error: null,
      };

    case PET_DETAILS_FAILED:
      return {
        ...state,
        pet: null,
        loading: false,
        error: payload,
      };
    case PET_CREATION_SUCCESS:
      return {
        ...state,
        pet: payload,
        loading: false,
        error: null,
      };
    case PET_CREATION_FAILED:
      return {
        ...state,
        pet: null,
        loading: false,
        error: payload,
      };
    case PET_DELETE_SUCCESS:
      return {
        ...state,
        pet: payload,
        loading: false,
        error: null,
      };
    case PET_DELETE_FAILED:
      return {
        ...state,
        pet: null,
        loading: false,
        error: payload,
      };
    case PET_UPDATE_SUCCESS:
      return {
        ...state,
        pet: payload,
        loading: false,
        error: null,
      };
    case PET_UPDATE_FAILED:
      return {
        ...state,
        pet: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
//Provider

export const PetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(petReducer, INITIAL_STATE);
  const { userAuth } = useContext(authContext);
  console.log();
  const postPetAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userAuth?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.post(`${API_URL_PET}`, formData, config);

      if (res?.data?.status === "success") {
        dispatch({
          type: PET_CREATION_SUCCESS,
          payload: res?.data,
        });
      }
      window.location.href = "/manage-pets/";
    } catch (error) {
      dispatch({
        type: PET_CREATION_FAILED,
        payload: error?.response?.data?.message,
      });
      console.log(error);
    }
  };

  const fetchPetAction = async (id, lat, lng) => {
    try {
      console.log(lat, lng);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      //make api call
      const res = await axios.get(
        `${API_URL_PET}/${id}?latitude=${lat}&longitude=${lng}`,
        config
      );
      //use dispatch to update state
      if (res?.data?.status === "success") {
        dispatch({
          type: PET_DETAILS_SUCCESS,
          payload: res?.data,
        });
        console.log(res);
      }
    } catch (error) {
      dispatch({
        type: PET_DETAILS_FAILED,
        payload: error?.data?.response?.message,
      });
    }
  };

  const deletePetAction = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.delete(API_URL_PET + id, config);
      if (res?.data?.status === "success") {
        dispatch({
          type: PET_DELETE_SUCCESS,
          payload: res?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: PET_DELETE_FAILED,
        payload: error?.response?.data?.message,
      });
      console.log(error);
    }
  };

  const updatePetAction = async (id, formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.userAuth?.token}`,
      },
    };
    try {
      const url = API_URL_PET + id;
      console.log(url);
      const res = axios.put(url, formData, config);

      if (res?.data?.status === "success") {
        dispatch({
          type: PET_UPDATE_SUCCESS,
          payload: res?.data,
        });
      }
      console.log(res);
    } catch (error) {
      dispatch({
        type: PET_UPDATE_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
  return (
    <petContext.Provider
      value={{
        updatePetAction,
        fetchPetAction,
        postPetAction,
        deletePetAction,
        pet: state?.pet,
        error: state?.error,
      }}
    >
      {children}
    </petContext.Provider>
  );
};
