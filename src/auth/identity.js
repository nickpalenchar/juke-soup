import { useState, useEffect } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import User from '../models/User';

export default function useUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const _id = localStorage.getItem('_id');
    const auth = getAuth();

    signInAnonymously(auth)
      .then(() => true)
      .catch(error => {
        console.error('Could not sign in with firebase auth:\n', error.code, error.message);
      });

    onAuthStateChanged(auth, (authUser) => {
      console.log('user is ', authUser?.uid);
      if (!authUser?.uid) {
        return;
      }
      User.findOrCreate({_authId: authUser.uid})
        .then(userFromDb => {
          localStorage.setItem('_id', userFromDb._id);
          if (user?._id !== userFromDb._id) {
            setUser(user);
          }
        });
    });

  });

  return user;
}

export function getCurrentUserId() {
  return localStorage.getItem('_id');
}
