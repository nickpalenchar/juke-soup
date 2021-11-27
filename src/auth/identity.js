import { useState, useEffect } from 'react';
import User from '../models/User';

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      return;
    }
    User.findOrCreate({id})
      .then(user => {
        if (user) {
          console.log('USER?? ', user);
          localStorage.setItem('id', user.id);
          setUser(user);
        }
      });
  });

  return user;
}
