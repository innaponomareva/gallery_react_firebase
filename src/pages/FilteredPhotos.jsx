import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Gallery from "../components/Gallery";
import { PhotoContext } from "../context/photo/photoContext";

const FilteredPhotos = () => {
  const { photos, getAllPhotos } = useContext(PhotoContext);
  const { id } = useParams();
  const selection = photos.filter((item) => item.hashtags.includes(id));

  useEffect(() => {
    getAllPhotos();
  }, [getAllPhotos]);

  return <Gallery gallery={selection} />;
};

export default FilteredPhotos;
