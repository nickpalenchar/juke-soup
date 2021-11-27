import { useState, useEffect } from 'react';
import User from '../models/User';

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const _id = localStorage.getItem('_id');
    User.findOrCreate({_id})
      .then(user => {
        localStorage.setItem('_id', user._id);
        setUser(_id);
      })
  });

  return user;
}
