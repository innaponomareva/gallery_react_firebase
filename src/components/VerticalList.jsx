import React, { useEffect } from "react";
import styles from "../css/verticalList.module.css";
import clsx from "clsx";
import { BsX } from "react-icons/bs";
import EditBox from "./EditBox";

const VerticalList = ({ gallery, onCloseClickHandler }) => {
  return (
    <>
      {gallery.length > 0 && (
        <div className={styles.vertical_list}>
          {gallery.map((item, ind) => (
            <div key={ind}>
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
              <div className={styles.divider}></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default VerticalList;
