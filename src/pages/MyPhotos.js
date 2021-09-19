import React, { useContext, useEffect } from 'react';
import { PhotoContext } from '../context/photo/photoContext';
import Gallery from '../components/Gallery';
import Loader from '../components/Loader';

const MyPhotos = () => {
  const { photos, getAllPhotos, loading } = useContext(PhotoContext);

  useEffect(() => {
    if(photos.length === 0){
      getAllPhotos();
    }
  }, [getAllPhotos, photos.length]);


  
  return (
    <>
    { loading ?
    <Loader /> 
    :
    <Gallery gallery={photos} />
    }
    
    </>
  )
}


export default MyPhotos;