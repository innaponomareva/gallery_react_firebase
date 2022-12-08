import {
  deleteDoc,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { storage, firestore } from "../config/firebase_config";
import { ref, deleteObject } from "firebase/storage";

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
    await setDoc(
      doc(firestore, "images", id),
      { id, created, fileNameInStorage, description, hashtags, fileUrl, size },
      { merge: true }
    );
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function updatePhoto_fb({ id, description, hashtags }) {
  try {
    await setDoc(
      doc(firestore, "images", id),
      {
        id,
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
  const photoDoc = doc(firestore, "images", id);
  const pathRef = ref(storage, `images/${fileNameInStorage}`);
  try {
    await deleteDoc(photoDoc);
    await deleteObject(pathRef);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function getAllPhotos_fb() {
  const reference = collection(firestore, "images");
  const photos = [];
  try {
    const querySnapshot = await getDocs(reference);
    querySnapshot.forEach((doc) => {
      photos.push(doc.data());
    });
    return photos;
  } catch (error) {
    return Promise.reject(error.message);
  }
}
