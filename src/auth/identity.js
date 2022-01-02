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

    onAuthStateChanged(auth, (user) => {
      console.log('user is ', user?.uid);
      User.findOrCreate({_id})
        .then(user => {
          localStorage.setItem('_id', user._id);
          setUser(_id);
        });
    });

  });

  return user;
}

export function getCurrentUserId() {
  return localStorage.getItem('_id');
}
