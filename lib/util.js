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
    console.error(e);
    return null;
  }
}

export function encrypt(message) {
  try {
    return AES.encrypt(message, secret).toString();
  } catch (e) {
    console.error(e);
    return "";
  }
}

export function decrypt(message) {
  try {
    return AES.decrypt(message, secret).toString(utf8);
  } catch (e) {
    console.error(e);
    return "";
  }
}

export function getCode(str, seed = "") {
  return MD5(secret + str + seed)
    .toString()
    .slice(0, 6);
}

export function exportAsJSON(obj, name) {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(obj, null, 2));
  const node = document.createElement("a");
  node.setAttribute("href", dataStr);
  node.setAttribute("download", name + ".json");
  document.body.appendChild(node); // required for firefox
  node.click();
  node.remove();
}
