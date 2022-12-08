import React from "react";
import "../css/slider.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Slider = ({ gallery, index, prevBtnHandler, nextBtnHandler }) => (
  <>
    {gallery.length > 0 && (
      <div className="slider">
        <img src={gallery[index].fileUrl} alt="slider_img" />
        <div className="chevron_container">
          <div className="chevron" onClick={prevBtnHandler}>
            <BsChevronLeft />
          </div>
          <div className="chevron" onClick={nextBtnHandler}>
            <BsChevronRight />
          </div>
        </div>
      </div>
    )}
  </>
);

export default Slider;
