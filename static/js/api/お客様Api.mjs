import { PoccoIO } from "../PoccoIO.mjs";
import { お客様RepositoryImpl } from "../datasource/お客様RepositoryImpl.mjs";
import { お客様, お客様ID } from "../domain/お客様.mjs";

export class お客様Api {
  #poccoIO;
  #_お客様Repository
  
  /**
   * @private
   */
  constructor() {
    this.#poccoIO = new PoccoIO();
  }

  async load() {
    this.#_お客様Repository = await お客様RepositoryImpl.create(this.#poccoIO)
  }

  static async create() {
    const result = new お客様Api();
    await result.load();
    return result;
  }

  /**
   * 
   * @param {string} id 
   * @param {string} name 
   */
  async 入会する(id, name) {
    await this.#_お客様Repository.入会する(new お客様(new お客様ID(id), name));
  }

  /**
   * 
   * @param {string} id 
   */
  async ログインする(id) {
    if(await this.#_お客様Repository.認証する(new お客様ID(id))) {
      location.href = `./list.html?id=${id}`
    } else {
      alert("ログインに失敗しました。お客様IDをご確認ください。");
      throw new Error("ログインに失敗しました。お客様IDをご確認ください。");
    }
  }

  /**
   * 
   * @param {string} id 
   */
  async お客様氏名を取得する(id) {
    const user = await this.#_お客様Repository.お客様を取得する(new お客様ID(id));
    return user.お客様氏名;
  }
}