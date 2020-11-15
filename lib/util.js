import AES from "crypto-js/aes";
import MD5 from "crypto-js/md5";
import utf8 from "crypto-js/enc-utf8";

const secret = process.env.NEXT_PUBLIC_SECRET || "supersecret";

export function encode(data) {
  return Buffer.from(JSON.stringify(data)).toString("base64");
}

export function decode(dataEncoded) {
  try {
    return JSON.parse(Buffer.from(dataEncoded, "base64").toString("ascii"));
  } catch (e) {
    return null;
  }
}

export function encrypt(message) {
  try {
    return AES.encrypt(message, secret).toString();
  } catch (e) {
    return "";
  }
}

export function decrypt(message) {
  try {
    return AES.decrypt(message, secret).toString(utf8);
  } catch (e) {
    return "";
  }
}

export function getCode(str) {
  return MD5(secret + str)
    .toString()
    .slice(0, 6);
}
