export const RandomUtil = {

    /**
     * 生成指定长度的随机字符串
     * 
     * @param length 字符串的长度，由调用者指定
     * @returns 返回一个由随机字符组成的字符串
     * 
     */
    randomString(length:number): string {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += randomChars.charAt(
                Math.floor(Math.random() * randomChars.length)
            );
        }
        return result;
    },

    /**
     * 生成指定范围内的随机数
     * 
     * @param min 最小值，表示生成随机数的下限
     * @param max 最大值，表示生成随机数的上限
     * @returns 返回一个在[min, max]范围内的随机整数
     * 
     */
    randomNum(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
};