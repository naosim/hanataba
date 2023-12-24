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
  お客様ID

  /**
   * 
   * @param {注文ID} 注文ID 
   * @param {Date} お届け日 
   * @param {string} 送り主氏名 
   * @param {string} お届け先住所 
   * @param {string} お届け先氏名 
   * @param {花束コード} ご注文花束コード 
   * @param {boolean} メッセージ要不要 
   * @param {string} お届けメッセージ 
   * @param {お客様ID} お客様ID 
   */
  constructor(
    注文ID,
    お届け日,
    送り主氏名,
    お届け先住所,
    お届け先氏名,
    ご注文花束コード,
    メッセージ要不要,
    お届けメッセージ,
    お客様ID
  ) {
    this.注文ID = 注文ID
    this.お届け日 = お届け日
    this.送り主氏名 = 送り主氏名
    this.お届け先住所 = お届け先住所
    this.お届け先氏名 = お届け先氏名
    this.ご注文花束コード = ご注文花束コード
    this.メッセージ要不要 = メッセージ要不要
    this.お届けメッセージ = お届けメッセージ
    this.お客様ID = お客様ID
  }
}

export class 注文ID extends StringValueObject {
}
