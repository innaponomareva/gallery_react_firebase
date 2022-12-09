import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Gallery from "../components/Gallery";
import Loader from "../components/Loader";
import { PhotoContext } from "../context/photo/photoContext";

const FilteredPhotos = () => {
  const { photos, getAllPhotos, loading } = useContext(PhotoContext);
  const { id } = useParams();
  const selection = photos.filter((item) => item.hashtags.includes(id));

  useEffect(() => {
    getAllPhotos();
  }, [getAllPhotos]);

  return (
    <>
      {loading && <Loader />}
      {!loading && selection.length > 0 ? (
        <Gallery gallery={selection} />
      ) : (
        <p>No photos found...</p>
      )}
    </>
  );
};

export default FilteredPhotos;
