import React, { useContext } from "react";
import "../css/modalWindow.css";
import { BsTrash, BsPencil } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { PhotoContext } from "../context/photo/photoContext";

const InfoBox = ({ gallery, index }) => {
  const { removePhoto } = useContext(PhotoContext);

  const transformDescription = (desc) => {
    const output = [];
    const temp = desc.split(" ");
    temp.forEach((item, ind) => {
      if (item.startsWith("#")) {
        let itemArray = item.split("");
        itemArray.splice(0, 1);
        const interpunktion = itemArray.filter(
          (char) =>
            char === "!" ||
            char === "?" ||
            char === "." ||
            char === "," ||
            char === ":" ||
            char === ";"
        );
        itemArray = itemArray.filter(
          (char) =>
            char !== "!" &&
            char !== "?" &&
            char !== "." &&
            char !== "," &&
            char !== ":" &&
            char !== ";"
        );
        const path = itemArray.join("");
        const link = (
          <NavLink key={ind} to={`/myphotos/${path}`}>
            {"#" + path}
          </NavLink>
        );
        if (interpunktion.length > 0) {
          output.push(link);
          output.push(interpunktion.join(""));
        } else if (interpunktion.length === 0) {
          output.push(link, " ");
        }
      } else {
        output.push(item, " ");
      }
    });
    return output;
  };

  const onEditClickHandler = () => {
    document.querySelector(`.info-box-${index}`).style.display = "none";
    document.querySelector(`.edit-box-${index}`).style.display = "flex";
    document.querySelector(`.edit-box-${index} textarea`).focus();
  };

  const onRemoveClickHandler = () => {
    const result = window.confirm(
      "Are you sure you want to delete this photo?"
    );
    if (!result) return false;
    removePhoto({
      id: gallery[index].id,
      fileNameInStorage: gallery[index].fileNameInStorage,
    });
  };

  return (
    <div className={`info-box info-box-${index}`}>
      <div className="desc">
        {transformDescription(gallery[index].description)}
      </div>

      <div className="btn-container">
        <button
          className="btn symbol-btn edit-btn"
          onClick={onEditClickHandler}
        >
          <BsPencil />
        </button>

        <button
          className="btn symbol-btn remove-btn"
          data-index={index}
          onClick={onRemoveClickHandler}
        >
          <BsTrash />
        </button>
      </div>
    </div>
  );
};

export default InfoBox;
