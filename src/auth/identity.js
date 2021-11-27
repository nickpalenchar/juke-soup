import { useState, useEffect } from 'react';
import User from '../models/User';

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(1)
    const _id = localStorage.getItem('_id');
    if (!_id) {
      return User.create()
        .then(user => {
          console.log('new user', user);
          localStorage.setItem('_id', '123');
          setUser(user);
        })
      return;
    }
    if (_id === '999') {
      console.log('DONE ');
      setUser({hello: 'wourld'});
    }
    User.findOrCreate({_id})
      .then(user => {
        console.log('new user coul ald not fourd', user);
        localStorage.setItem('_id', '999');
      })
    setUser(_id);
  });

  return user;
}
