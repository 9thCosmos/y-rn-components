import { deepMerge } from '@quec/utils/object';
import chroma from 'chroma-js';
import { quecPanelDefaultTheme } from './themes';

// 文字颜色等级
export type TextColorLevel = 'level1' | 'level2' | 'level3' | 'level4' | 'stamp';

// 共享配置，这部分配置，配置和使用的格式是一致的
interface SharedThemeConfig {
    // 背景颜色
    bgColor: string;
    // 前景色
    fgColor: string;
    // 互动叠加色，需要透明度
    pressColor: string;
    // 遮罩颜色
    maskColor: string;
    // 主题色
    primaryColor: string;
    successColor: string;
    warningColor: string;
    dangerColor: string;
    // 阴影颜色
    shadowColor: string;
    // 边框色
    borderColor: string;
    // TODO 滑块背景颜色，需要与设计讨论颜色体系
    sliderBgColor: string;
    // 默认禁用色
    disableColor: string;
    // 步进器默认边框色
    // TODO 需要与设计讨论颜色体系，是否在主题中配置，还是在组件中配置
    stepperBorderColor: string;
}

// 组件实际使用的配置
export interface QuecPanelThemeConfig extends SharedThemeConfig {
    // 文字颜色
    // 配置一个不含透明度的颜色，自动计算出不同级别的颜色，或者直接配置不同级别的颜色
    textColor: Record<TextColorLevel, string>;
    // 分割线颜色
    // 根据文字颜色自动计算出不同级别的颜色，或者直接配置不同级别的颜色
    lineColor: {
        hard: string;
        light: string;
    };
}

// 传入创建方法的配置，这部分配置会有相关逻辑转换整合
export interface CreateThemeConfigProps extends SharedThemeConfig {
    textColor: Record<TextColorLevel, string> | string;
    lineColor?: {
        hard: string;
        light: string;
    };
}

export const createThemeConfig = (theme: CreateThemeConfigProps): QuecPanelThemeConfig => {
    // 梯度字体颜色转换
    if (typeof theme.textColor === 'string') {
        const textColor = theme.textColor;
        theme.textColor = {
            level1: chroma(textColor).alpha(1).hex(),
            level2: chroma(textColor).alpha(0.6).hex(),
            level3: chroma(textColor).alpha(0.4).hex(),
            level4: chroma(textColor).alpha(0.2).hex(),
            stamp: chroma(textColor).alpha(0.04).hex(),
        };
    }
    // 梯度分割线颜色转换
    if (!theme.lineColor) {
        theme.lineColor = {
            hard: chroma(theme.textColor.level1).alpha(0.1).hex(),
            light: chroma(theme.textColor.level1).alpha(0.05).hex(),
        };
    }

    return deepMerge(JSON.parse(JSON.stringify(quecPanelDefaultTheme)), theme);
};
