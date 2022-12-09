import React, { useCallback, useEffect } from "react";
import styles from "../css/verticalList.module.css";
import clsx from "clsx";
import { BsX } from "react-icons/bs";
import EditBox from "./EditBox";

const VerticalList = ({ gallery, width, index, onCloseClickHandler }) => {
  const findPos = useCallback(
    (obj) => {
      const position = width >= 500 ? obj.offsetTop - 75 : obj.offsetTop - 66;
      return position;
    },
    [width]
  );

  useEffect(() => {
    const anchor = document.querySelector(`.photo-item-${index}`);
    if (anchor) {
      setTimeout(
        () => window.scroll({ top: findPos(anchor), behavior: "smooth" }),
        200
      );
    }
  }, [findPos, index]);

  return (
    <>
      {gallery.length > 0 && (
        <div className={styles.vertical_list}>
          {gallery.map((item, ind) => (
            <div key={ind}>
              <div className={clsx(styles.photo_item, `photo-item-${ind}`)}>
                <img src={item.fileUrl} data-index={ind} alt={item.id} />
              </div>
              <EditBox
                gallery={gallery}
                index={ind}
                onHashtagClickHandler={onCloseClickHandler}
              />
              {onCloseClickHandler && (
                <BsX
                  className={styles.close_icon_verticalList}
                  onClick={onCloseClickHandler}
                />
              )}
              <div className={styles.divider}></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default VerticalList;
