import { DiContainer } from "../DiContainer.mjs";
import { 花束コード } from "../domain/カタログ/商品.mjs";

class Form {
  constructor(key, type, isRequired) {
    this.key = key;
    this.type = type;
    this.isRequired = isRequired
  }

  /**
   * 
   * @returns {string | null} エラーメッセージを返す
   */
  verify() {
    const value = this.getValue();
    if(this.isRequired && value.length == 0) {
      return `${this.key}:必須項目だが空文字`;
    }
    return null;
  }

  getValue() {
    // @ts-ignore
    return document.querySelector(`#${this.key}`)?.value.trim();
  }
  
  toHtml() {
    return `${this.key}: <input type="${this.type}" id="${this.key}"  />`
  }
}

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

// const list = await _カタログApi.すべての商品を取得する();
// const divList = document.querySelector("#list")
// if(divList) {
//   divList.innerHTML = list.map(v => `<div>${v.商品名} ${v.価格}円 <button onclick="location.href = './buy?id=${id}&code=${encodeURI(v.花束コード)}'">買う</button></div>`).join("\n")
// }

var formList = [
  new Form("お届け日", "date", true),
  new Form("送り主氏名", "text", true),
  new Form("お届け先住所", "text", true),
  new Form("お届け先氏名", "text", true),
  new Form("注文花束コード", "text", true),
  new Form("お届けメッセージ", "text", false),
]

// @ts-ignore
document.querySelector("#form").innerHTML = formList.map(v => v.toHtml()).join("<br>")

// @ts-ignore
var v = document.querySelector("#注文花束コード").value = code;




document.querySelector("#送信")?.addEventListener("click", () => {
  const errors = formList.map(v => v.verify()).filter(v => v);
  if(errors.length > 0) {
    alert(errors.join("\n"));
    throw new Error(errors.join(","))
  }
  /** @type {any} */
  const map = formList.reduce((memo, v) => {
    memo[v.key] = v;
    return memo;
  }, {})

  _注文Api.注文する(
    new Date(map.お届け日.getValue()),
    map.送り主氏名.getValue(),
    map.お届け先住所.getValue(),
    map.お届け先氏名.getValue(),
    map.注文花束コード.getValue(),
    map.お届けメッセージ.getValue().length > 0,
    map.お届けメッセージ.getValue(),
    id
  )
})

