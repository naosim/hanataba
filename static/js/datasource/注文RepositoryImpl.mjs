import { PoccoIO } from "../PoccoIO.mjs";
import { お客様ID } from "../domain/お客様.mjs";
import { 花束コード } from "../domain/カタログ/商品.mjs";
import { 注文, 注文ID, 注文Repository } from "../domain/注文.mjs";
import { toObject } from "../lib/ObjectConverter.mjs";

export class 注文RepositoryImpl extends 注文Repository {
  /** @type {PoccoIO} */
  poccoIO

  /**
   * @type {注文[]}
   */
  #values = []

  #dataFilename = "注文.json"

  /**
   * @private
   * @param {PoccoIO} poccoIO 
   */
  constructor(poccoIO) {
    super()
    this.poccoIO = poccoIO;
  }

  /**
   * @param {PoccoIO} poccoIO 
   * @returns {Promise<注文RepositoryImpl>}
   */
  static async create(poccoIO) {
    const result = new 注文RepositoryImpl(poccoIO);
    await result.load();
    return result;
  }

  async load() {
    const ary = await this.poccoIO.read(this.#dataFilename)
    this.#values = ary.map(v => new 注文(
      new 注文ID(v.注文ID),
      new Date(v.お届け日),
      v.送り主氏名,
      v.お届け先住所,
      v.お届け先氏名,
      new 花束コード(v.ご注文花束コード),
      v.メッセージ要不要,
      v.お届けメッセージ,
      new お客様ID(v.お客様ID)
    ))
  }

  async #save() {
    await this.poccoIO.write(this.#dataFilename, toObject(this.#values));
  }

  /**
   * @override
   * @param {注文} _注文 
   */
  async 注文する(_注文) {
    this.#values.push(_注文);
    await this.#save();
  }

  #num = 0;
  /**
   * @returns {注文ID}
   */
  注文IDを生成する() {
    return new 注文ID(`注文${Date.now()}_${this.#num++}`)
  }
}