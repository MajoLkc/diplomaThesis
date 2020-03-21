import Aes from 'cryptr';

const crypto = new Aes('majo nevie JS');

export function encryptString(stringToEncrypt) {
  return crypto.encrypt(stringToEncrypt);
}

export function decryptString(stringToDecrypt) {
  return crypto.decrypt(stringToDecrypt);
}
