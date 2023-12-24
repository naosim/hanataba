import { StringValueObject } from "../lib/ValueObject.mjs"
import { お客様ID } from "./お客様.mjs"
import { 花束コード } from "./商品.mjs"

export class 受注 {
  /** @type {注文ID} */
  注文ID
  /** @type {Date} */
  お届け日
  /** @type {string} */
  送り主氏名
  /** @type {string} */
  お届け先住所
  /** @type {string} */
  お届け先氏名
  /** @type {花束コード} */
  ご注文花束コード
  /** @type {boolean} */
  メッセージ要不要
  /** @type {string} */
  お届けメッセージ
  /** @type {お客様ID} */
  ユーザID
}

export class 注文ID extends StringValueObject {
}
