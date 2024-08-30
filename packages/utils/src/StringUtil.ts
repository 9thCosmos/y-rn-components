export const StringUtil = {
    /**
     * 判断是否是空字符串，数字或其他类型也算非空
     * @param value 
     * @returns 
     */
    isStringEmpty(value): boolean {
        return value === undefined || value === null || value.length === 0
    }
};