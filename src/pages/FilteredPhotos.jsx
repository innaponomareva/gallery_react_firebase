import { useParams } from 'react-router-dom';
import Gallery from '../components/Gallery';
import Loader from '../components/Loader';
import { usePhotoState } from '../context/photo/usePhotoState';

const FilteredPhotos = () => {
  const { photos, loading } = usePhotoState();
  const { id } = useParams();
  const selection = photos.filter((item) => item.hashtags.includes(id));

  return (
    <>
      {loading && <Loader />}
      {!loading && selection.length > 0 && <Gallery gallery={selection} />}
    </>
  );
};

export default FilteredPhotos;
