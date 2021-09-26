import React from "react";
import "../css/gridList.css";

const GridList = ({ gallery, onThumbnailClickHandler, width }) => {
  return (
    <>
      {width > 1100 && (
        <div className="grid-container-large">
          {gallery.map((item, index) => (
            <div
              className={`grid-item grid-item-${index}`}
              key={index}
              onClick={onThumbnailClickHandler}
              data-index={index}
              style={{ backgroundImage: `url(${item.fileUrl})` }}
            ></div>
          ))}
        </div>
      )}
      {width < 1100 && width > 700 && (
        <div className="grid-container-middle">
          {gallery.map((item, index) => (
            <div
              className={`grid-item grid-item-${index}`}
              key={index}
              onClick={onThumbnailClickHandler}
              data-index={index}
              style={{ backgroundImage: `url(${item.fileUrl})` }}
            ></div>
          ))}
        </div>
      )}
      {width < 700 && (
        <div className="grid-container-small">
          {gallery.map((item, index) => (
            <div
              className={`grid-item grid-item-${index}`}
              key={index}
              onClick={onThumbnailClickHandler}
              data-index={index}
              style={{ backgroundImage: `url(${item.fileUrl})` }}
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

export default GridList;
