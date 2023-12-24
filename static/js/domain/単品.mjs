import { StringValueObject } from "../lib/ValueObject.mjs"
import { 仕入先コード } from "./仕入先.mjs"

export class 単品 {
  /** @type {花コード} */
  花コード
  /** @type {string} */
  花名称
  /** @type {仕入先コード} */
  仕入先コード
  /** @type {number} */
  発注リードタイム
  /** @type {number} */
  購入単位数
  /** @type {number} */
  品質維持可能日数

  /**
   * 
   * @param {花コード} 花コード 
   * @param {string} 花名称 
   * @param {仕入先コード} 仕入先コード 
   * @param {number} 発注リードタイム 
   * @param {number} 購入単位数 
   * @param {number} 品質維持可能日数 
   */
  constructor(
    花コード,
    花名称,
    仕入先コード,
    発注リードタイム,
    購入単位数,
    品質維持可能日数
  ) {
    this.花コード = 花コード
    this.花名称 = 花名称
    this.仕入先コード = 仕入先コード
    this.発注リードタイム = 発注リードタイム
    this.購入単位数 = 購入単位数
    this.品質維持可能日数 = 品質維持可能日数
  }

  を発注する() {}
}

export class 花コード extends StringValueObject {
}
