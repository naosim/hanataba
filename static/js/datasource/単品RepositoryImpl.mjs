import { PoccoIO } from "../PoccoIO.mjs";
import { 仕入先コード } from "../domain/カタログ/仕入先.mjs";
import { 単品, 単品Repository, 花コード } from "../domain/カタログ/単品.mjs";
import { toObject } from "../lib/ObjectConverter.mjs";

export class 単品RepositoryImpl extends 単品Repository{
  /** @type {PoccoIO} */
  poccoIO

  /**
   * @type {単品[]}
   */
  #values = []

  #dataFilename = "単品.json"

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
    this.#values = ary.map(v => new 単品(new 花コード(v.花コード), v.花名称, new 仕入先コード(v.仕入先コード), v.発注リードタイム, v.購入単位数, v.品質維持可能日数))
  }

  /**
   * 
   * @param {PoccoIO} poccoIO 
   */
  static async create(poccoIO) {
    const result = new 単品RepositoryImpl(poccoIO);
    await result.load();
    return result;
  }

  /**
   * @override
   * @returns {Promise<単品[]>}
   */
  async すべての単品を取得する() {
    return [...this.#values]
  }

  /**
   * @override
   * @param {単品} _単品 
   */
  async 単品を追加する(_単品) {
    this.#values.push(_単品)
    await this.#save()
  }

  async #save() {
    await this.poccoIO.write(this.#dataFilename, this.#values.map(v => toObject(v)));
  }

  #num = 0;
  /**
   * @override
   * @returns {花コード}
   */
  花コードを生成する() {
    return new 花コード(`花${Date.now()}_${this.#num++}`)
  }
}