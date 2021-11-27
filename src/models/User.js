import { ORM } from './orm';

const UserSchema = {
  money: String,
  score: String,
  id: Number,
  displayName: String
}

const User = ORM.model('User', UserSchema);

console.log('user?? ', User);

export default User;
