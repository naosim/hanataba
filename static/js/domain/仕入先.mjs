import { StringValueObject } from "../lib/ValueObject.mjs"

export class 仕入先 {
    /** @type {仕入先コード} */
    仕入先コード
    /** @type {string} */
    仕入先名
}

export class 仕入先コード extends StringValueObject {
}
