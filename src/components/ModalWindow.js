import React from 'react';
import '../css/modalWindow.css';
import { BsX } from "react-icons/bs";
import InfoBox from './InfoBox';
import EditBox from './EditBox';
import Slider from './Slider';



const ModalWindow = ({gallery, index, prevBtnHandler, nextBtnHandler, onRemoveClickHandler, onCloseClickHandler}) => 
  (
    <>
    <div className="modal-window">
      <Slider gallery={gallery} index={index} prevBtnHandler={prevBtnHandler} nextBtnHandler={nextBtnHandler} />
      <InfoBox gallery={gallery} index={index} onRemoveClickHandler={onRemoveClickHandler} onCloseClickHandler={onCloseClickHandler} />
      {<EditBox gallery={gallery} index={index} />}
      <BsX className="close-icon-slider" onClick={onCloseClickHandler} />
    </div>
    </>
  )



export default ModalWindow;