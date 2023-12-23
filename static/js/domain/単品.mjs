import { StringValueObject } from "../lib/ValueObject.mjs"
import { 仕入先コード } from "./仕入先.mjs"

export class 単品 {
    /** @type {花コード} */
    花コード
    花名
    /** @type {仕入先コード} */
    仕入先コード
    /** @type {number} */
    購入単位数

    を発注する() {}
}

export class 花コード extends StringValueObject {
}
