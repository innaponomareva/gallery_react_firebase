import { useContext, useEffect } from 'react';
import { PhotoContext } from '../context/photo/photoContext';
import Gallery from '../components/Gallery';
import Loader from '../components/Loader';

const MyPhotos = () => {
  const { photos, getAllPhotos, loading } = useContext(PhotoContext);

  useEffect(() => {
    getAllPhotos();
  }, [getAllPhotos]);

  return (
    <>
      {loading && <Loader />}
      {!loading && photos.length > 0 && <Gallery gallery={photos} />}
    </>
  );
};

export default MyPhotos;
