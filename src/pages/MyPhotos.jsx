import Gallery from '../components/Gallery';
import Loader from '../components/Loader';
import { usePhotoState } from '../context/photo/usePhotoState';

const MyPhotos = () => {
  const { photos, loading } = usePhotoState();

  return (
    <>
      {loading && <Loader />}
      {!loading && photos.length > 0 && <Gallery gallery={photos} />}
      {!loading && photos.length === 0 && <div>no photos...</div>}
    </>
  );
};

export default MyPhotos;
