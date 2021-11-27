import {getFirestore} from "firebase/firestore";

if (process.NODE_ENV === 'development') {
  // const db = getFirestore();
}

let db;

export default function getDatabase() {
  if (db) {
    return db;
  }
  db = getFirestore();
  return db;
}

