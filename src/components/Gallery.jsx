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
    window.scroll({ top: 0 });
  };

  return (
    <div className="gallery">
      {gallery.length > 0 ? (
        <>
          {width > 800 && (
            <>
              {open && (
                <>
                  <div className="blocker"></div>
                  <ModalWindow
                    gallery={gallery}
                    initialIndex={index}
                    onCloseClickHandler={onCloseClickHandler}
                  />
                </>
              )}
              <MosaicList
                gallery={gallery}
                onPhotoClickHandler={onPhotoClickHandler}
                lineWidth={width >= 1000 ? 1000 : 800}
              />
            </>
          )}

          {width <= 800 && (
            <>
              {open ? (
                <VerticalList
                  gallery={gallery}
                  width={width}
                  index={index}
                  onCloseClickHandler={onCloseClickHandler}
                />
              ) : (
                <MosaicList
                  gallery={gallery}
                  onPhotoClickHandler={onPhotoClickHandler}
                  lineWidth={width >= 500 ? width - 32 : width - 16}
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
