import React, { useContext, useEffect, useState } from "react";
import styles from "../css/form.module.css";
import { Timestamp } from "firebase/firestore";
import { useFormik } from "formik";
import * as yup from "yup";
import { cleanStorage_fb, onFileChange_fb } from "../service/appService";
import { PhotoContext } from "../context/photo/photoContext";
import { Alert } from "../components/Alert";
import { AlertContext } from "../context/alert/alertContext";
import clsx from "clsx";

const schema = yup.object().shape({
  description: yup
    .string()
    .min(1, "Too short description")
    .max(200, "Too long description")
    .required("Describe your photo, please."), // check if input is empty
});

const UploadPhoto = () => {
  const { addPhoto } = useContext(PhotoContext);
  const { show, hide } = useContext(AlertContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileNameInStorage, setfileNameInStorage] = useState(null);
  const [fileSize, setFileSize] = useState(null);

  const onFileChange = async (event) => {
    const response = await onFileChange_fb(event, { directory: "images" });
    setFileUrl(response.fileUrl);
    setfileNameInStorage(response.fileNameInStorage);
    setFileSize(response.size);
  };

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
    return () => {
      cleanStorage_fb("images");
      hide();
    };
  }, [hide]);

  const formik = useFormik({
    initialValues: {
      description: "",
    },

    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      const hashtags = getHashtags(values.description);
      try {
        await addPhoto({
          id: "img_" + Timestamp.now().seconds,
          created: Timestamp.now().seconds,
          fileNameInStorage,
          description: values.description,
          hashtags: hashtags,
          fileUrl: fileUrl,
          size: fileSize,
        });
        show({ text: "The upload is successful!", type: "success" });
      } catch (error) {
        show({ text: error, type: "warning" });
      } finally {
        actions.resetForm();
      }
      formik.resetForm();
      setTimeout(() => hide(), 2000);
      actions.setSubmitting(false);
    },
    validationSchema: schema,
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <p className={styles.title}>Upload a photo</p>
      <Alert />

      <div className={styles.form_item}>
        <label htmlFor="photo">
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/png, image/jpeg"
            onChange={onFileChange}
          />
          <p className={styles.label}>JPEG or PNG:</p>
        </label>
        {formik.touched && formik.errors.description && (
          <div className="alert alert-warning alert-validate">
            {formik.errors.description}
          </div>
        )}
      </div>

      <div>
        <textarea
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          type="text"
          placeholder="add a description"
          className={styles.textarea}
        />
      </div>

      <button
        type="submit"
        className={clsx(
          styles.btn,
          fileUrl ? styles.submit_btn : styles.submit_btn_disabled
        )}
        disabled={!fileUrl}
      >
        Submit
      </button>
    </form>
  );
};

export default UploadPhoto;
