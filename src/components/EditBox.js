import React, { useContext, useEffect, useState } from "react";
import "../css/modalWindow.css";
import { BsCheckCircle, BsBoxArrowInRight } from "react-icons/bs";
import { PhotoContext } from "../context/photo/photoContext";

const EditBox = ({ gallery, index }) => {
  const { updatePhoto } = useContext(PhotoContext);
  const [value, setValue] = useState(gallery[index].description);

  const getHashtags = (desc) => {
    const array = [];
    const temp = desc.split(" ");
    temp.forEach((item) => {
      if (item.startsWith("#")) {
        const hashtagArray = item.split("");
        hashtagArray.splice(0, 1);
        const string = hashtagArray.join("");
        array.push(string);
      }
      return null;
    });
    return array;
  };

  useEffect(() => {
    setValue(gallery[index].description);
  }, [index, gallery]);

  const onSubmitClickHandler = async (event) => {
    event.preventDefault();
    if (event.target.classList.contains(`edit-box-${index}`)) {
      const hashtags = getHashtags(value);
      try {
        updatePhoto({
          id: gallery[index].id,
          description: value,
          hashtags: hashtags,
        });
      } catch (error) {
        console.log(error);
      } finally {
        document.querySelector(`.edit-box-${index}`).style.display = "none";
        document.querySelector(`.info-box-${index}`).style.display = "flex";
      }
    }
  };

  const onCancelClickHander = (event) => {
    event.preventDefault();

    if (event.target.parentNode.classList.contains("cancel-btn")) {
      document.querySelector(`.edit-box-${index}`).style.display = "none";
      document.querySelector(`.info-box-${index}`).style.display = "flex";
      setValue(gallery[index].description);
    }
  };

  return (
    <form
      className={`edit-box edit-box-${index}`}
      onSubmit={onSubmitClickHandler}
    >
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <div className="btn-container">
        <button type="submit" className="btn symbol-btn save-btn">
          <BsCheckCircle />
        </button>

        <button
          className="btn symbol-btn cancel-btn"
          onClick={onCancelClickHander}
        >
          <BsBoxArrowInRight />
        </button>
      </div>
    </form>
  );
};

export default EditBox;
