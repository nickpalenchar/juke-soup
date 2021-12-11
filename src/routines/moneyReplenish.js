import User from '../models/User';
import { getCurrentUserId } from "../auth/identity";
import { MAX_MONEY } from '../constants';

const LAST_UPDATE = 'lastMoneyUpdate';
const INTERVAL = 3 * 60 * 1000;
const MONEY_PER_INTERVAL = 3;

let loopId = null;

export function startMoneyLoop() {
  const loop = async () => {
    const lastUpdate = +localStorage.getItem(LAST_UPDATE);
    const now = Date.now();
    console.log({lastUpdate, INTERVAL, now});
    if (lastUpdate + INTERVAL < now) {
      const moneyToGive = Math.floor((now - lastUpdate) / INTERVAL) * MONEY_PER_INTERVAL;
      const _id = getCurrentUserId();
      const user = await User.findById(_id);
      const adjustedMoney = user.money + moneyToGive < MAX_MONEY ? user.money + moneyToGive : MAX_MONEY;
      await User.update({_id}, {money: adjustedMoney});
      localStorage.setItem(LAST_UPDATE, Date.now());
      loopId = setTimeout(loop, INTERVAL);
    }
    else {
      console.log('now?? ', now);
      console.log({INTERVAL})
      console.log('last up?? ', lastUpdate);
      console.log('not ready for money, will update in ', lastUpdate + INTERVAL - now);
      loopId = setTimeout(loop, lastUpdate + INTERVAL - now);
      return loopId;
    }
  }
  if (loopId !== null) {
    console.error('startMoneyLoop - cannot start loop when already running');
    return;
  }
  console.log('starting loop');
  return loop();
}

export function stopMoneyLoop () {
  if (loopId === null) {
    console.warn('stopMoneyLoop - nothing to stop');
    return;
  }
  clearTimeout(loopId);
  loopId = null;
}
