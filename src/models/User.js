import { ORM } from './orm';
import { MAX_MONEY } from '../constants';

const UserSchema = {
  _authId: String,
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
