import { PoccoIO } from "../PoccoIO.mjs";
import { 商品, 商品Repository, 花束コード } from "../domain/カタログ/商品.mjs";

export class 商品RepositoryImpl extends 商品Repository{
    /** @type {PoccoIO} */
  poccoIO

  /**
   * @type {商品[]}
   */
  #values = []

  #dataFilename = "商品.json"

  /**
   * @private
   * @param {PoccoIO} poccoIO 
   */
  constructor(poccoIO) {
    super()
    this.poccoIO = poccoIO;
  }

  async load() {
    const ary = await this.poccoIO.read(this.#dataFilename)
    this.#values = []// TODO 実装
  }

  /**
   * 
   * @param {PoccoIO} poccoIO 
   */
  static async create(poccoIO) {
    const result = new 商品RepositoryImpl(poccoIO);
    await result.load();
    return result;
  }

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
    this.#values.push(_商品)
    await this.#save()
  }

  async #save() {
    await this.poccoIO.write(this.#dataFilename, this.#values.map(v => v.toObject()));
  }

  #num = 0;
  /**
   * @returns {花束コード}
   */
  花束コードを生成する() {
    return new 花束コード(`花束${Date.now()}_${this.#num++}`)
  }
}