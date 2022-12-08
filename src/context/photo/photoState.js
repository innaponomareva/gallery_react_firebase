import React, { useCallback, useReducer } from "react";
import { PhotoContext } from "./photoContext";
import { PhotoReducer } from "./photoReducer";
import {
  addPhoto_fb,
  getAllPhotos_fb,
  removePhoto_fb,
  updatePhoto_fb,
} from "../../service/photoService";
import {
  ADD_PHOTO,
  GET_ALL_PHOTOS,
  REMOVE_PHOTO,
  SET_INDEX,
  SET_LOADING,
  STOP_LOADING,
  UPDATE_PHOTO,
} from "../types";

export const PhotoState = ({ children }) => {
  const initialState = {
    photos: [],
    targetIndex: 0,
    loading: false,
  };
  const [state, dispatch] = useReducer(PhotoReducer, initialState);
  const { photos, targetIndex, loading } = state;

  const defineTargetIndex = (index) => {
    setDefineTargetIndex(index);
  };

  const addPhoto = async (photo) => {
    try {
      await addPhoto_fb(photo);
      setAddPhoto(photo);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const removePhoto = async ({ id, fileNameInStorage }) => {
    try {
      await removePhoto_fb({ id, fileNameInStorage });
      setRemovePhoto(id);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updatePhoto = async ({ id, description, hashtags }) => {
    try {
      await updatePhoto_fb({ id, description, hashtags });
      setUpdatePhoto({ id, description, hashtags });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getAllPhotos = useCallback(async () => {
    setLoading();
    try {
      const response = await getAllPhotos_fb();
      setGetAllPhotos(response);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      stopLoading();
    }
  }, []);

  // Actions:
  const setAddPhoto = (photo) => dispatch({ type: ADD_PHOTO, payload: photo });
  const setRemovePhoto = (id) => dispatch({ type: REMOVE_PHOTO, payload: id });
  const setUpdatePhoto = (update) =>
    dispatch({ type: UPDATE_PHOTO, payload: update });
  const setGetAllPhotos = (data) =>
    dispatch({ type: GET_ALL_PHOTOS, payload: data });
  const setLoading = () => dispatch({ type: SET_LOADING });
  const stopLoading = () => dispatch({ type: STOP_LOADING });
  const setDefineTargetIndex = (index) =>
    dispatch({ type: SET_INDEX, payload: index });

  return (
    <PhotoContext.Provider
      value={{
        photos,
        loading,
        targetIndex,
        addPhoto,
        removePhoto,
        updatePhoto,
        getAllPhotos,
        defineTargetIndex,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
