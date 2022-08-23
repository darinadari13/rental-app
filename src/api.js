import { db, storage } from './firebase'
import { uid } from 'uid';

import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const AD_COLLECTION_NAME = 'advertisements'
const IMAGE_COLLECTION_NAME = 'images'

export async function createAd(fields) {
  return setDoc(doc(db, AD_COLLECTION_NAME, uid()), fields);
}

export async function getAdList() {
  const adCol = collection(db, AD_COLLECTION_NAME);
  const adSnapshot = await getDocs(adCol);
  return adSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

  return res.metadata.fullPath
}