import { ORM } from './orm';

const UserSchema = {
  money: Number,
  score: Number,
  displayName: String
}

const User = ORM.model('User', UserSchema);
User.preCreate((user) => {
  user.score = user.score || 0;
  user.money = user.money || 15;
});

export default User;
