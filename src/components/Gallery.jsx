import React, { useEffect, useState } from "react";
import ModalWindow from "./ModalWindow";
import MosaicList from "./MosaicList";
import VerticalList from "./VerticalList";

const Gallery = ({ gallery }) => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width, setOpen]);

  const onPhotoClickHandler = (event) => {
    const currIndex = event.target.getAttribute("data-index");
    setIndex(parseInt(currIndex));
    setOpen(true);
  };

  const onCloseClickHandler = () => {
    setIndex(0);
    setOpen(false);
  };

  return (
    <div className="gallery">
      {gallery.length > 0 ? (
        <>
          {width > 800 && (
            <>
              {open && <div className="blocker"></div>}
              {!open && (
                <MosaicList
                  gallery={gallery}
                  onPhotoClickHandler={onPhotoClickHandler}
                  lineWidth={width >= 1000 ? 1000 : 800}
                />
              )}
              {open && (
                <ModalWindow
                  gallery={gallery}
                  initialIndex={index}
                  onCloseClickHandler={onCloseClickHandler}
                />
              )}
            </>
          )}

          {width <= 800 && (
            <>
              {!open && (
                <MosaicList
                  gallery={gallery}
                  onPhotoClickHandler={onPhotoClickHandler}
                  lineWidth={width >= 500 ? width - 32 : width - 16}
                />
              )}
              {open && (
                <VerticalList
                  gallery={gallery}
                  targetIndex={index}
                  onCloseClickHandler={onCloseClickHandler}
                />
              )}
            </>
          )}
        </>
      ) : (
        <div className="help-text">No photos found...</div>
      )}
    </div>
  );
};

export default Gallery;
