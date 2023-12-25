import { お客様, お客様ID, お客様Repository } from "../domain/お客様.mjs";

export class お客様Api {
  /** @type {お客様Repository} */
  #_お客様Repository
  
  /**
   * 
   * @param {お客様Repository} _お客様Repository 
   */
  constructor(_お客様Repository) {
    this.#_お客様Repository = _お客様Repository
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