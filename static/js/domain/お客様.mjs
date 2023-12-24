import { StringValueObject } from "../lib/ValueObject.mjs"

export class お客様 {
  /** @type {お客様ID} */
  お客様ID

  /** @type {string} */
  お客様氏名

  /**
   * 
   * @param {お客様ID} お客様ID 
   * @param {string} お客様氏名 
   */
  constructor(お客様ID, お客様氏名) {
    this.お客様ID = お客様ID
    this.お客様氏名 = お客様氏名
  }
}

export class お客様ID extends StringValueObject {
}


/**
 * @abstract
 */
export class お客様Repository {
  /**
   * 
   * @param {お客様} user 
   */
  入会する(user) {
    throw new Error("未実装");
  }

  /**
   * 
   * @param {お客様ID} id 
   * @returns {Promise<boolean>}
   */
  async 認証する(id) {
    throw new Error("未実装");
  }

  /**
   * 
   * @param {お客様ID} id 
   * @returns {Promise<お客様>}
   */
  async お客様を取得する(id) {
    throw new Error("未実装");
  }

}