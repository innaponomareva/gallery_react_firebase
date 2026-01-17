import { useContext } from 'react';
import { PhotoContext } from './photoContext';

export const usePhotoState = () => useContext(PhotoContext);
