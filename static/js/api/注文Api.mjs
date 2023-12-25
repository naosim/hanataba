import { お客様ID } from "../domain/お客様.mjs";
import { 花束コード } from "../domain/カタログ/商品.mjs";
import { 注文, 注文Repository } from "../domain/注文.mjs";

export class 注文Api {
	/** @type {注文Repository} */
	#_注文Repository;
	
	/**
	 * 
	 * @param {注文Repository} _注文Repository 
	 */
	constructor(_注文Repository) {
		this.#_注文Repository = _注文Repository
	}

	/**
	 * 
	 * @param {Date} お届け日 
	 * @param {string} 送り主氏名 
	 * @param {string} お届け先住所 
	 * @param {string} お届け先氏名 
	 * @param {string} _ご注文花束コード 
	 * @param {boolean} メッセージ要不要 
	 * @param {string | null} お届けメッセージ 
	 * @param {string} _お客様ID 
	 */
	async 注文する(
		お届け日,
    送り主氏名,
    お届け先住所,
    お届け先氏名,
    _ご注文花束コード,
    メッセージ要不要,
    お届けメッセージ,
    _お客様ID
	) {
		const _注文ID = await this.#_注文Repository.注文IDを生成する();
		await this.#_注文Repository.注文する(new 注文(
			_注文ID,
			お届け日,
    	送り主氏名,
    	お届け先住所,
    	お届け先氏名,
    	new 花束コード(_ご注文花束コード),
    	メッセージ要不要,
    	お届けメッセージ,
    	new お客様ID(_お客様ID)
		))
	}


}