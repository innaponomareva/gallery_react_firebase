import React, { useEffect } from "react";
import styles from "../css/verticalList.module.css";
import clsx from "clsx";
import { BsX } from "react-icons/bs";
import EditBox from "./EditBox";

const VerticalList = ({ gallery, targetIndex, onCloseClickHandler }) => {
  useEffect(() => {
    function findPos(obj) {
      let curtop = 0;
      if (obj.offsetParent) {
        do {
          curtop = curtop + obj.offsetTop - 57.5;
        } while (obj === obj.offsetParent);
        return [curtop];
      }
    }
    const anchor = document.querySelector(`.divider-${targetIndex}`);
    if (anchor) {
      window.scroll(0, findPos(anchor));
    }
  }, [targetIndex]);

  return (
    <>
      {gallery.length > 0 && (
        <div className={styles.vertical_list}>
          {gallery.map((item, ind) => (
            <div key={ind}>
              <div
                className={clsx(styles.divider, `divider divider-${ind}`)}
              ></div>
              <div className={clsx(styles.photo_item, `photo-item-${ind}`)}>
                <img src={item.fileUrl} data-index={ind} alt={item.id} />
              </div>
              <EditBox gallery={gallery} index={ind} />
              {onCloseClickHandler && (
                <BsX
                  className={styles.close_icon_verticalList}
                  onClick={onCloseClickHandler}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default VerticalList;
