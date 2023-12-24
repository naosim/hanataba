import { StringValueObject } from "../lib/ValueObject.mjs"
import { 仕入先コード } from "./仕入先.mjs"

export class 単品 {
    /** @type {花コード} */
    花コード
    /** @type {string} */
    花名称
    /** @type {仕入先コード} */
    仕入先コード
    /** @type {number} */
    発注リードタイム
    /** @type {number} */
    購入単位数
    /** @type {number} */
    品質維持可能日数

    を発注する() {}
}

export class 花コード extends StringValueObject {
}
