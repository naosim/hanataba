import { StringValueObject } from "../lib/ValueObject.mjs"
import { 花コード } from "./単品.mjs"

export class 商品 {
  /** @type {花束コード} */
  花束コード
  商品名
  価格
  /**@type {単品と数[]} */
  単品と数リスト
}

export class 花束コード extends StringValueObject {
}

export class 単品と数 {
  /** @type {花コード} */
  花コード
  /** @type {number} */
  数

}