import CryptoJS from "crypto-js";

const key = process.env.CRYPTO_KEY;

const iv = CryptoJS.lib.WordArray.random(16);

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, key, {
    iv: iv,
  }).toString();
};

const decryptData = (encryptData) => {
  return CryptoJS.AES.decrypt(encryptData, key, {
    iv: iv,
  }).toString(CryptoJS.enc.Utf16);
};

export const encryptField = (value) => encryptData(value);
export const decryptField = (value) => decryptData(value);

export { encryptData, decryptData };
