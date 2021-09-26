import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Slider = ({ gallery, index, prevBtnHandler, nextBtnHandler }) => (
  <div className="slider">
    <img className="item" src={gallery[index].fileUrl} alt="slider_img" />
    <div className="chevron-container">
      <div className="chevron" onClick={prevBtnHandler}>
        <BsChevronLeft />
      </div>
      <div className="chevron" onClick={nextBtnHandler}>
        <BsChevronRight />
      </div>
    </div>
  </div>
);

export default Slider;
