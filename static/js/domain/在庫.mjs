import { StringValueObject } from "../lib/ValueObject.mjs"
import { 花コード } from "./単品.mjs"

export class 在庫 {
    /** @type {在庫ID} */
    在庫ID
    /** @type {花コード} */
    花コード
    /** @type {Date} */
    納品日
    /** @type {Date} */
    品質維持期限日
}

export class 在庫ID extends StringValueObject {
}
