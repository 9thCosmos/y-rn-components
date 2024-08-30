export interface QPThemeConfig {
    // 主题类型
    type?: 'light' | 'dark';
    // 品牌色
    brandColor: string;
    // 成功色
    successColor: string;
    // 警告色
    warningColor: string;
    // 错误色
    errorColor: string;
}

// 中性色，1-5为字体颜色，6-11为背景色
export type NeutralColorName = 'gy1' | 'gy2' | 'gy3' | 'gy4' | 'gy5' | 'gy6' | 'gy7' | 'gy8' | 'gy9' | 'gy10' | 'gy11';

export type BrandColorName = 'brand0' | 'brand1' | 'brand2' | 'brand3';
export type SuccessColorName = 'success0' | 'success1' | 'success2' | 'success3';
export type WarningColorName = 'warning0' | 'warning1' | 'warning2' | 'warning3';
export type ErrorColorName = 'error0' | 'error1' | 'error2' | 'error3';

export type ColorName = NeutralColorName | BrandColorName | SuccessColorName | WarningColorName | ErrorColorName;
export type QPTheme = {
    color: Record<ColorName, string>;
};
