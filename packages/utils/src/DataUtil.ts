export default class DataUtil {
    /**
    * 参数是否空
    * @param value
    * @returns {boolean}
    */
    static isNull(value: any) {
        return value === undefined || value === null
    }

    /**
   * 字符串是否为空
   * @param value
   * @returns {boolean}
   */
    static isStringEmpty(value): boolean {
        return value === undefined || value === null || value.length === 0
    }

    /**
    * 数组是否为空
    * @param array
    * @returns {boolean}
    */
    static isArrayEmpty(array): boolean {
        if (array === undefined || array === null) {
            return true
        }
        return array.length === 0
    }
}