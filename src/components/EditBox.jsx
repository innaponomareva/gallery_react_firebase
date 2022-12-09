import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/editBox.module.css";
import { useFormik } from "formik";
import { BsCheckCircle, BsXCircle, BsTrash, BsPencil } from "react-icons/bs";
import { PhotoContext } from "../context/photo/photoContext";
import clsx from "clsx";

const EditBox = ({ gallery, index, onHashtagClickHandler }) => {
  const { updatePhoto, removePhoto } = useContext(PhotoContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const photo = gallery[index];

  const transformDescription = (desc) => {
    const output = [];
    const temp = desc.split(" ");
    temp.forEach((item, ind) => {
      if (item.startsWith("#")) {
        const path = item.substring(1, item.length);
        const link = (
          <NavLink
            key={ind}
            to={`/myphotos/${path}`}
            onClick={onHashtagClickHandler}
          >
            {"#" + path}
          </NavLink>
        );
        output.push(" ");
        output.push(link);
        output.push(" ");
      } else {
        output.push(" " + item + " ");
      }
    });
    return output;
  };

  const onRemoveClickHandler = () => {
    const result = window.confirm(
      "Are you sure you want to delete this photo?"
    );
    if (result)
      removePhoto({
        id: gallery[index].id,
        fileNameInStorage: gallery[index].fileNameInStorage,
      });
  };

  const formik = useFormik({
    initialValues: {
      description: photo.description,
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      const hashtags = getHashtags(values.description);
      await updatePhoto({
        id: photo.id,
        description: values.description,
        hashtags: hashtags,
      });
      actions.setSubmitting(false);
      setIsDisabled(true);
    },
    enableReinitialize: true,
  });

  return (
    <>
      {isDisabled && (
        <div className={styles.edit_box}>
          <div className={styles.desc}>
            {transformDescription(gallery[index].description)}
          </div>

          <div className={styles.btn_container}>
            <button
              className={clsx(styles.btn, styles.symbol_btn, styles.edit_btn)}
              onClick={() => setIsDisabled(!isDisabled)}
            >
              <BsPencil />
            </button>

            <button
              className={clsx(styles.btn, styles.symbol_btn, styles.remove_btn)}
              data-index={index}
              onClick={onRemoveClickHandler}
            >
              <BsTrash />
            </button>
          </div>
        </div>
      )}

      {!isDisabled && (
        <form className={styles.edit_box} onSubmit={formik.handleSubmit}>
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <div className={styles.btn_container}>
            <button
              type="submit"
              className={clsx(styles.btn, styles.symbol_btn, styles.save_btn)}
            >
              <BsCheckCircle />
            </button>

            <button
              className={clsx(styles.btn, styles.symbol_btn, styles.cancel_btn)}
              onClick={() => setIsDisabled(!isDisabled)}
            >
              <BsXCircle />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditBox;

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
