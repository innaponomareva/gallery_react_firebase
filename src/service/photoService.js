import { fb } from "../config/firebase_config";
import firebase from "firebase";

export async function onFileChange_fb(event) {
  let width, height;
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (event) {
    const image = new Image();
    image.src = event.target.result;
    image.onload = function () {
      height = this.height;
      width = this.width;
    };
  };

  try {
    const storageRef = fb.storage().ref();
    const imagesRef = storageRef.child("images"); // Create a directory reference
    const fileNameInStorage = createUniqueFileNameInStorage(file);
    const fileRefInStorage = imagesRef.child(fileNameInStorage);
    await fileRefInStorage.put(file);
    return {
      fileUrl: await fileRefInStorage.getDownloadURL(),
      fileNameInStorage: fileNameInStorage,
      size: {
        width,
        height,
        KB: file.size * 0.001,
        format: calcFormat(width, height),
      },
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

function createUniqueFileNameInStorage(file) {
  return file.name + "_" + firebase.firestore.Timestamp.now().seconds;
}

function calcFormat(width, height) {
  if (width / height > 2) return "panorama";
  if (width / height > 1) return "landscape";
  if (width / height <= 1) return "upright";
}

export async function addPhoto_fb({
  id,
  created,
  fileNameInStorage,
  description,
  hashtags,
  fileUrl,
  size,
}) {
  try {
    const ref = fb.firestore().collection("images").doc(id);
    await ref.set(
      {
        id,
        created,
        fileNameInStorage,
        fileUrl,
        description,
        hashtags,
        size,
      },
      { merge: true }
    );
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function updatePhoto_fb({ id, description, hashtags }) {
  try {
    const ref = fb.firestore().collection("images").doc(id);
    await ref.set(
      {
        description,
        hashtags,
      },
      { merge: true }
    );
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function removePhoto_fb({ id, fileNameInStorage }) {
  try {
    const storageRef = fb.storage().ref();
    const fileRef = storageRef.child("images/" + fileNameInStorage);
    await fileRef.delete(); // Delete this file in storage
    await fb.firestore().collection("images").doc(id).delete(); // Delete the corresponding doc in firestore
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function getAllPhotos_fb() {
  try {
    const allPhotos = [];
    const querySnapshot = await fb
      .firestore()
      .collection("images")
      .orderBy("created")
      .get();
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        allPhotos.push(doc.data());
      });
      return allPhotos;
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function cleanStorage_fb() {
  // Check junk files in Storage and remove them
  try {
    const allFileNamesInFirestore = await getAllFileNamesInFirestore();
    const { allFileNamesInStorage, storageRef } =
      await getAllFileNamesInStorage();
    const combined = allFileNamesInFirestore.concat(allFileNamesInStorage);
    const obj = checkIfFileNameExistsTwiceOrOnce(combined);
    const junkFiles = checkForJunkFiles(obj);

    if (junkFiles.length > 0) {
      junkFiles.forEach((item) => {
        const fileRef = storageRef.child("images/" + item.name);
        fileRef.delete();
      });
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
}

function checkForJunkFiles(obj) {
  return Object.values(obj).filter((item) => item.count === 1);
}

function checkIfFileNameExistsTwiceOrOnce(combined) {
  // if twice => count++ => these are files in use
  // if once => these are junk files
  const obj = {};
  for (let i = 0; i < combined.length; i++) {
    if (obj[`${combined[i]}`] && obj[`${combined[i]}`].count === 1) {
      obj[`${combined[i]}`].count++;
    } else {
      obj[`${combined[i]}`] = {};
      obj[`${combined[i]}`].name = combined[i];
      obj[`${combined[i]}`].count = 1;
    }
  }
  return obj;
}

async function getAllFileNamesInStorage() {
  const allFileNamesInStorage = [];
  const storageRef = await fb.storage().ref(); // Create a storage reference
  const imagesRef = await storageRef.child("images"); // Create a directory reference
  const list = await imagesRef.listAll();
  list.items.forEach((itemRef) => {
    allFileNamesInStorage.push(itemRef.name);
  });
  return { allFileNamesInStorage, storageRef };
}

async function getAllFileNamesInFirestore() {
  const allFileNamesInFirestore = [];
  const querySnapshot = await fb.firestore().collection("images").get();
  if (querySnapshot) {
    querySnapshot.forEach((doc) => {
      allFileNamesInFirestore.push(doc.data().fileNameInStorage);
    });
  }
  return allFileNamesInFirestore;
}
