const crypto = require("crypto");
const uuid = require('uuid');

/** Generates a unique(ish) identity of a device, used ONLY to determine the user via browser */
export default function getDeviceId() {
    return localStorage.getItem('id');
}

export function createDeviceId() {
    const id = uuid.v4();
    localStorage.setItem('id', id);
    return id;
}