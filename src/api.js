import { db, storage } from './firebase'
import { uid } from 'uid';

import { collection, getDocs, query, doc, where, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AD_COLLECTION_NAME = 'advertisements'
const IMAGE_COLLECTION_NAME = 'images'

export async function createAd(fields) {
  const id = uid()
  await setDoc(doc(db, AD_COLLECTION_NAME, id), fields);
  return { id, ...fields }
}

export async function getAdList({ northEast, southWest }) {
  const q = query(
    collection(db, AD_COLLECTION_NAME),
    where("location.lng", ">", southWest.lng),
    where("location.lng", "<", northEast.lng)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(doc => doc.location.lat > southWest.lat && doc.location.lat < northEast.lat);
}

export function updateAd(id, fields) {
  return updateDoc(doc(db, AD_COLLECTION_NAME, id), fields);
}

export function deleteAd(id) {
  return deleteDoc(doc(db, AD_COLLECTION_NAME, id));
}

export async function uploadFile(file) {
  const storageRef = ref(storage, `${IMAGE_COLLECTION_NAME}/${uid()}`);

  const res = await uploadBytes(storageRef, file)


  return res.metadata.name
}

export async function getFileDowloadUrl(fileName) {
  return getDownloadURL(ref(storage, `${IMAGE_COLLECTION_NAME}/${fileName}`))
}