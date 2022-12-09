import React, { useCallback, useEffect, useState } from "react";
import "../css/modalWindow.css";
import { BsX } from "react-icons/bs";
import EditBox from "./EditBox";
import Slider from "./Slider";

const ModalWindow = ({ gallery, initialIndex, onCloseClickHandler }) => {
  const [index, setIndex] = useState(initialIndex);

  const nextBtnHandler = useCallback(() => {
    if (index === gallery.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }, [index, gallery]);

  const prevBtnHandler = useCallback(() => {
    if (index === 0) {
      setIndex(gallery.length - 1);
    } else {
      setIndex(index - 1);
    }
  }, [index, gallery]);

  useEffect(() => {
    const handleKeyEvent = (event) => {
      if (event.key === "ArrowRight") {
        nextBtnHandler();
      } else if (event.key === "ArrowLeft") {
        prevBtnHandler();
      }
    };
    document.addEventListener("keydown", handleKeyEvent);
    return () => document.removeEventListener("keydown", handleKeyEvent);
  }, [nextBtnHandler, prevBtnHandler]);

  return (
    <>
      {gallery.length > 0 && (
        <div className="modal_window">
          <Slider
            gallery={gallery}
            index={index}
            prevBtnHandler={prevBtnHandler}
            nextBtnHandler={nextBtnHandler}
          />
          <EditBox
            gallery={gallery}
            index={index}
            onHashtagClickHandler={onCloseClickHandler}
          />
          <BsX className="close_icon_slider" onClick={onCloseClickHandler} />
        </div>
      )}
    </>
  );
};

export default ModalWindow;
