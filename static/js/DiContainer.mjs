import { PoccoIO } from "./PoccoIO.mjs";
import { お客様Api } from "./api/お客様Api.mjs";
import { カタログApi } from "./api/カタログApi.mjs";
import { 注文Api } from "./api/注文Api.mjs";
import { お客様RepositoryImpl } from "./datasource/お客様RepositoryImpl.mjs";
import { 商品RepositoryImpl } from "./datasource/商品RepositoryImpl.mjs";
import { 注文RepositoryImpl } from "./datasource/注文RepositoryImpl.mjs";
import { お客様Repository } from "./domain/お客様.mjs";
import { 商品Repository } from "./domain/カタログ/商品.mjs";
import { 注文Repository } from "./domain/注文.mjs";

export class DiContainer {
  

  /**
   * @returns {Promise<PoccoIO>}
   */
  async getPoccoIO() {
    return await this.#poccoIO.getInstance();
  }
  #poccoIO = new Lazy(async () => new PoccoIO())

  /**
   * @returns {Promise<商品Repository>}
   */
  async get商品Repository() {
    return await this.#商品Repository.getInstance();
  }
  #商品Repository = new Lazy(async () => await 商品RepositoryImpl.create(await this.getPoccoIO()))

  /**
   * @returns {Promise<お客様Repository>}
   */
  async getお客様Repository() {
    return await this.#お客様Repository.getInstance();
  }
  #お客様Repository = new Lazy(async () => お客様RepositoryImpl.create(await this.getPoccoIO()))

  /**
   * @returns {Promise<注文Repository>}
   */
  async get注文Repository() {
    return await this.#注文Repository.getInstance();
  }
  #注文Repository = new Lazy(async () => 注文RepositoryImpl.create(await this.getPoccoIO()))



  /**
   * @returns {Promise<カタログApi>}
   */
  async getカタログApi() {
    return await this.#カタログApi.getInstance();
  }
  #カタログApi = new Lazy(async () => new カタログApi(await this.get商品Repository()))

  /**
   * @returns {Promise<お客様Api>}
   */
  async getお客様Api() {
    return await this.#お客様Api.getInstance();
  }
  #お客様Api = new Lazy(async () => new お客様Api(await this.getお客様Repository()))

  /**
   * @returns {Promise<注文Api>}
   */
  async get注文Api() {
    return await this.#注文Api.getInstance();
  }
  #注文Api = new Lazy(async () => new 注文Api(await this.get注文Repository()))

  

}

class Lazy {
  /** @type {any}  */
  #value = null;
  #factory
  constructor(factory) {
    this.#factory = factory;
  }
  async getInstance() {
    if(!this.#value) {
      this.#value = await this.#factory();
    }
    return this.#value
  }
}