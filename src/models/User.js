import { ORM } from './orm';
import { MAX_MONEY } from '../constants';

const UserSchema = {
  money: Number,
  score: Number,
  displayName: String
}

const User = ORM.model('User', UserSchema);
User.preCreate((user) => {
  user.score = user.score || 0;
  user.money = user.money ?? MAX_MONEY;
});

export default User;
