import { ORM } from './orm';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = {
  money: Number,
  score: Number,
  id: String,
  displayName: String
}

const User = ORM.model('User', UserSchema);
User.preCreate((user) => {
  user.id = uuidv4();
  user.score = user.score || 0;
  user.money = user.money || 15;
});

export default User;
