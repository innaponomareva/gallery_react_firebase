import React, { useContext, useState } from "react";
import "../css/form.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import firebase from "firebase";
import { cleanStorage_fb, onFileChange_fb } from "../service/photoService";
import { PhotoContext } from "../context/photo/photoContext";
import { Alert } from "../components/Alert";
import { AlertContext } from "../context/alert/alertContext";

// validation with yup
const schema = yup.object().shape({
  description: yup
    .string()
    .min(1, "Too short description")
    .max(200, "Too long description")
    .required("Describe your photo, please."), // check if input is empty
});

const UploadPhoto = () => {
  const { addPhoto } = useContext(PhotoContext);
  const { show } = useContext(AlertContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileNameInStorage, setfileNameInStorage] = useState(null);
  const [fileSize, setFileSize] = useState(null);

  const onFileChange = async (event) => {
    try {
      // response contains file url and unique file name in Storage
      const response = await onFileChange_fb(event);
      setFileUrl(response.fileUrl);
      setfileNameInStorage(response.fileNameInStorage);
      setFileSize(response.size);
    } catch (error) {
      console.log(error);
    }
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

  return (
    <Formik
      initialValues={{
        description: "",
      }}
      onSubmit={async (values, actions) => {
        const hashtags = getHashtags(values.description);
        try {
          // collect and send information about photo
          await addPhoto({
            id: "img_" + firebase.firestore.Timestamp.now().seconds,
            created: firebase.firestore.Timestamp.now().seconds,
            fileNameInStorage,
            description: values.description,
            hashtags: hashtags,
            fileUrl: fileUrl,
            size: fileSize,
          });
          show({ text: "The upload is successful!", type: "success" }); // show success alert
          await cleanStorage_fb(); // remove junk files in Storage if any
        } catch (error) {
          show({ text: error, type: "warning" }); // show error alert
        } finally {
          document.querySelector("#photo").value = null; // clear file input
          actions.resetForm(); // clear hashtag inputs
        }
      }}
      validationSchema={schema}
    >
      {(props) => (
        <Form className="form">
          <p className="title">Add a photo to the gallery!</p>
          <Alert />

          <label htmlFor="photo">JPEG or PNG:</label>
          <Field
            type="file"
            id="photo"
            name="photo"
            accept="image/png, image/jpeg"
            onChange={onFileChange}
          />

          {/* show this if validation finds error */}
          <ErrorMessage name="hashtags">
            {(message) => (
              <div className="alert alert-warning alert-validate">
                {message}
              </div>
            )}
          </ErrorMessage>

          <Field
            as="textarea"
            id="description"
            name="description"
            type="text"
            placeholder="add a description"
          />

          <button type="submit" className="btn submit-btn" disabled={!fileUrl}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UploadPhoto;
