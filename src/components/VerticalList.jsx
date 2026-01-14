import { useCallback, useEffect } from 'react';
import styles from '../css/verticalList.module.css';
import clsx from 'clsx';
import { BsX } from 'react-icons/bs';
import EditBox from './EditBox';

const VerticalList = ({ gallery, width, index, onCloseClickHandler }) => {
  const findPos = useCallback(
    (obj) => {
      const position = width >= 500 ? obj.offsetTop - 75 : obj.offsetTop - 66;
      return position;
    },
    [width]
  );

  useEffect(() => {
    const anchor = document.querySelector(`.list-item-${index}`);
    if (anchor) {
      setTimeout(
        () => window.scroll({ top: findPos(anchor), behavior: 'smooth' }),
        200
      );
    }
  }, [findPos, index]);

  return (
    <>
      {gallery.length > 0 && (
        <div className={styles.vertical_list}>
          {gallery.map((item, ind) => (
            <div
              key={ind}
              className={clsx(styles.list_item, `list-item-${ind}`)}
            >
              <img src={item.fileUrl} className={styles.photo} alt={item.id} />
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
