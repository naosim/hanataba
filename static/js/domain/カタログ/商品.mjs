import { StringValueObject } from "../../lib/ValueObject.mjs"
import { 単品と数, 花コード } from "./単品.mjs"

export class 商品 {
  /** @type {花束コード} */
  花束コード
  商品名
  価格
  /**@type {単品と数[]} */
  単品と数リスト

  /**
   * 
   * @param {花束コード} 花束コード 
   * @param {string} 商品名 
   * @param {number} 価格 
   * @param {単品と数[]} 単品と数リスト 
   */
  constructor(
    花束コード,
    商品名,
    価格,
    単品と数リスト
  ) {
    this.花束コード = 花束コード
    this.商品名 = 商品名
    this.価格 = 価格
    this.単品と数リスト = 単品と数リスト

  }

  toObject() {
    return {
      花束コード: this.花束コード.value,
      商品名: this.商品名,
      価格: this.価格,
      単品と数リスト: this.単品と数リスト.map(v => v.toObject())
    }
  }

  static create(object) {
    return new 商品(
      new 花束コード(object.花束コード),
      object.商品名,
      object.価格,
      object.単品と数リスト.map(v => 単品と数.create(v))
    )
  }
}

export class 花束コード extends StringValueObject {
}

/**
 * @abstract
 */
export class 商品Repository {
  /**
   * @returns {Promise<商品[]>}
   */
  async すべての商品を取得する() {
    throw new Error("未実装");
  }

  /**
   * 
   * @param {商品} _商品 
   */
  async 商品を追加する(_商品) {
    throw new Error("未実装");
  }

  /**
   * @returns {花束コード}
   */
  花束コードを生成する() {
    throw new Error("未実装");
  }
}