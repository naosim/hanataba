import { PoccoIO } from "../PoccoIO.mjs";
import { 商品RepositoryImpl } from "../datasource/商品RepositoryImpl.mjs";

export class カタログApi {
  #poccoIO;
  /** @type {商品RepositoryImpl} */
  // @ts-ignore
  #_商品Repository;
  
  /**
   * @private
   */
  constructor() {
    this.#poccoIO = new PoccoIO();
  }

  async load() {
    this.#_商品Repository = await 商品RepositoryImpl.create(this.#poccoIO)
  }

  static async create() {
    const result = new カタログApi();
    await result.load();
    return result;
  }

  async すべての商品を取得する() {
    const list = await this.#_商品Repository.すべての商品を取得する();
    return list.map(v => v.toObject());
  }
}