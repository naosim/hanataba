import { 商品Repository } from "../domain/カタログ/商品.mjs";

export class カタログApi {
  /** @type {商品Repository} */
  #_商品Repository;
  
  /**
   * 
   * @param {商品Repository} _商品Repository 
   */
  constructor(_商品Repository) {
    this.#_商品Repository = _商品Repository
  }

  async すべての商品を取得する() {
    const list = await this.#_商品Repository.すべての商品を取得する();
    return list.map(v => v.toObject());
  }
}