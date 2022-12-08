import {
  ADD_PHOTO,
  GET_ALL_PHOTOS,
  REMOVE_PHOTO,
  SET_INDEX,
  SET_LOADING,
  STOP_LOADING,
  UPDATE_PHOTO,
} from "../types";

const handlers = {
  [ADD_PHOTO]: (state, { payload }) => {
    const photos = [...state.photos];
    photos.push(payload);
    return { ...state, photos: photos };
  },
  [REMOVE_PHOTO]: (state, { payload }) => {
    const photos = [...state.photos];
    const photoIndex = photos.findIndex((item) => item.id === payload);
    photos.splice(photoIndex, 1);
    return { ...state, photos: photos };
  },
  [UPDATE_PHOTO]: (state, { payload }) => {
    const photos = [...state.photos];
    const photo = photos.find((item) => item.id === payload.id);
    const photoIndex = photos.findIndex((item) => item.id === payload.id);
    photos[photoIndex] = { ...photo, ...payload };
    return { ...state, photos: photos };
  },
  [GET_ALL_PHOTOS]: (state, { payload }) => ({ ...state, photos: payload }),
  [SET_INDEX]: (state, { payload }) => {
    return { ...state, targetIndex: +payload };
  },
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  [STOP_LOADING]: (state) => ({ ...state, loading: false }),
  DEFAULT: (state) => state,
};

export const PhotoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
