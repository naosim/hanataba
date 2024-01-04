import { StringValueObject } from "../lib/ValueObject.mjs"
import { 花コード, 単品と数 } from "./カタログ/単品.mjs"
import { 注文, 注文ID } from "./注文.mjs";

export class 在庫リスト {

  /**
   * 
   * @param {注文} 注文 
   * @returns {boolean}
   */
  結束できる(注文) {
    return false;
  }

  /**
   * 
   * @param {注文} 注文
   * @returns { {結束予約リスト: 結束予約[], 発注リスト: 発注[]} }
   */
  結束予約する(注文) {
    return {結束予約リスト: [], 発注リスト: []}
  }
}

export class 在庫 {
    /** @type {在庫ID} */
    在庫ID
    /** @type {花コード} */
    花コード
    /** @type {Date} */
    納品日
    /** @type {Date} */
    品質維持期限日

    /** @type {発注} */
    発注
    /** @type {納品} */
    納品
    /** @type {結束予約[]} */
    結束予約リスト
    /** @type {廃棄} */
    廃棄
}

export class 発注 {
  /** @type {発注ID} */
  発注ID
  /** @type {花コード} */
  花コード
  /** @type {number} */
  数
  /** @type {Date} */
  納品予定日
}

export class 納品 {
    /** @type {納品ID} */
    納品ID
    /** @type {Date} */
    納品日
}

export class  廃棄 {
    /** @type {廃棄ID} */
    廃棄ID
    /** @type {納品ID} */
    納品ID
    /** @type {花コード} */
    花コード
    /** @type {number} */
    数
    /** @type {Date} */
    廃棄日
}

export class  結束予約 {
    /** @type {結束予約ID} */
    利用ID
    /** @type {納品ID} */
    納品ID
    /** @type {花コード} */
    花コード
    /** @type {number} */
    数
    /** @type {Date} */
    結束日
    /** @type {注文ID} */
    注文ID

    単品と数を取得する() {
        return new 単品と数(this.納品ID, this.数)
    }
}

export class 発注ID extends StringValueObject {
}

export class 在庫ID extends StringValueObject {
}

export class 納品ID extends StringValueObject {
}

export class 廃棄ID extends StringValueObject {
}

export class 結束予約ID extends StringValueObject {
}