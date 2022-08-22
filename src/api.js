import { ref, set } from "firebase/database";
import db from './firebase'
import { uuidv4 } from './utils'

const AD_COLLECTION_NAME = 'advertisements'

export function createAd(fields) {
  return set(ref(db, `${AD_COLLECTION_NAME}/${uuidv4()}`), fields);
}

export function getAdList() {
  // 
}

export function updateAd(id, fields) {
  // return set(ref(db, `${AD_COLLECTION_NAME}/${id}`), fields);
}

export function deleteAd(id) {
  // 
}

export function uploadFile() {
  // 
}

// TODO: 
// - finish CRUD operarations
// - implemet file upload via firebase storage (google it)
// - draw pins by list of ads from firebase