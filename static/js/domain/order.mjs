import { ユーザーID } from "./user.mjs"
import { 花束コード } from "./product.mjs"

export class 注文 {
  /** @type {string} */
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
  /** @type {ユーザーID} */
  ユーザID
}