const uuid = require('uuid');
const User = require('../models/User');
const Soup = require('../models/Quarry');

/** Generates a unique(ish) identity of a device, used ONLY to determine the user via browser */
export default function getDeviceId() {
    return localStorage.getItem('id');
}

export function createDeviceId() {
    const id = uuid.v4();
    localStorage.setItem('id', id);
    return id;
}

export async function isSoupLeader(userId, soupId) {
  const soup = await Soup.findById(soupId);
  return soup._id === userId;
}
