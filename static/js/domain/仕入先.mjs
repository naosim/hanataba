import { StringValueObject } from "../lib/ValueObject.mjs"

export class 仕入先 {
  /** @type {仕入先コード} */
  仕入先コード
  /** @type {string} */
  仕入先名
  constructor(仕入先コード, 仕入先名) {
      this.仕入先コード = 仕入先コード
      this.仕入先名 = 仕入先名
  }
}

export class 仕入先コード extends StringValueObject {
}

/**
 * @abstract
 */
export class 仕入先Repository {  
  /**
   * 
   * @param {仕入先} _仕入先 
   */
  async 仕入先を追加する(_仕入先) {
    throw new Error("未実装");
  }
}