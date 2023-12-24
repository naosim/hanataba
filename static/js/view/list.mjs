import { お客様Api } from "../api/お客様Api.mjs";

const {id} = location.href.split("?")[1].split("&").reduce((memo, v) => {
  const [key, value] = v.split("=");
  memo[key] = value;
  return memo;
}, {})

const _お客様Api = new お客様Api();
await _お客様Api.load();
const name = await _お客様Api.お客様氏名を取得する(id)
document.querySelector("#hello").innerHTML = `こんにちは、${name}さん`
