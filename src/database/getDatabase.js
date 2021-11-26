import {getFirestore, connectFirestoreEmulator} from "firebase/firestore";

if (process.NODE_ENV === 'development') {
  const db = getFirestore();
  connectFirestoreEmulator(db, 'localhost', 8080);
}

let db;

export default function getDatabase() {
  if (db) {
    return db;
  }

  if (process.NODE_ENV === 'production') {
    // TODO prod connection
  } else {
    const db = getFirestore();
    connectFirestoreEmulator(db, 'localhost', 8080);
    return db;
  }
}

