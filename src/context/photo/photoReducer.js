import { ADD_PHOTO, GET_ALL_PHOTOS, REMOVE_PHOTO, SET_INDEX, SET_LOADING, STOP_LOADING, UPDATE_PHOTO } from "../types";

const handlers = {
  [ADD_PHOTO]: (state, {payload}) => {
    const arr = [...state.photos];
    arr.push(payload);
    return {...state, photos: arr}
  },
  [REMOVE_PHOTO]: (state, {payload}) => {
    const arr = [...state.photos];
    const photoIndex = arr.findIndex(item => item.id === payload);
    arr.splice(photoIndex,1)
    return {...state, photos: arr}
  },
  [UPDATE_PHOTO]: (state, {payload}) => {
    const arr = [...state.photos];
    const photoIndex = arr.findIndex(item => item.id === payload.id);
    arr[photoIndex].description = payload.description;
    arr[photoIndex].hashtags = payload.hashtags;
    return {...state, photos: arr}
  },
  [SET_INDEX]: (state, {payload}) => {
    return {...state, targetIndex: +payload}
  },
  [SET_LOADING]: state => ({...state, loading: true}),
  [STOP_LOADING]: state => ({...state, loading: false}),
  [GET_ALL_PHOTOS]: (state, {payload}) => ({...state, photos: payload}),
  DEFAULT: (state) => state
  }

export const PhotoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
  }