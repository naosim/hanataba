import { DiContainer } from "../DiContainer.mjs";

// @ts-ignore
const {id, code} = location.href.split("?")[1].split("&").reduce((memo, v) => {
  const [key, value] = v.split("=");
  memo[key] = decodeURI(value);
  return memo;
}, {})

console.log(id, code);
const diContainer = new DiContainer();

const _お客様Api = await diContainer.getお客様Api()
const _カタログApi = await diContainer.getカタログApi();
const _注文Api = await diContainer.get注文Api()


const name = await _お客様Api.お客様氏名を取得する(id)
const divHello = document.querySelector("#hello");
if(divHello) {
  divHello.innerHTML = `こんにちは、${name}さん`
}

const list = await _カタログApi.すべての商品を取得する();
// const divList = document.querySelector("#list")
// if(divList) {
//   divList.innerHTML = list.map(v => `<div>${v.商品名} ${v.価格}円 <button onclick="location.href = './buy?id=${id}&code=${encodeURI(v.花束コード)}'">買う</button></div>`).join("\n")
// }