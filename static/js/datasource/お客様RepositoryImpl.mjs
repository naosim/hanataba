import { PoccoIO } from "../PoccoIO.mjs";
import { お客様, お客様ID, お客様Repository } from "../domain/お客様.mjs";

export class お客様RepositoryImpl extends お客様Repository {
  /** @type {PoccoIO} */
  poccoIO

  /**
   * @type {お客様[]}
   */
  #values = []

  #dataFilename = "お客様.json"

  /**
   * 
   * @param {PoccoIO} poccoIO 
   */
  constructor(poccoIO) {
    super()
    this.poccoIO = poccoIO;
  }
  /**
     * 
     * @param {お客様} user 
     */
  async 入会する(user) {
    this.#values.push(user);
    await this.#save();  
  }

  /**
   * @override
   * @param {お客様ID} id 
   * @returns {Promise<boolean>}
   */
  async 認証する(id) {
    return !!this.#探す(id)
  }

  /**
   * 
   * @param {お客様ID} id 
   * @returns {Promise<お客様>}
   */
  async お客様を取得する(id) {
    const entity = this.#探す(id);
    if(!entity) {
      throw new Error("お客様情報がない");
    }
    return entity
  }

  /**
   * 
   * @param {お客様ID} id 
   * @returns 
   */
  #探す(id) {
    for(let i = 0; i < this.#values.length; i++) {
      if(this.#values[i].お客様ID.value == id.value) {
        return this.#values[i];
      }
      return null;
    }
  }
  #isLoaded = false;
  async load() {
    this.#isLoaded = true;
    const ary = await this.poccoIO.read(this.#dataFilename)
    this.#values = ary.map(v => new お客様(new お客様ID(v.お客様ID), v.お客様氏名))
  }

  async #save() {
    await this.poccoIO.write(this.#dataFilename, this.#values);
  }
}