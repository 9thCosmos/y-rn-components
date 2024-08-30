import chroma from 'chroma-js';
import { QuecPanelThemeConfig } from '../ThemeConfig';

const defaultTextColor = '#080F19';
const black = '#000';
const fadeTextColor = (color: string, alpha: number) => {
    return chroma(color).alpha(alpha).hex();
};
export const quecPanelDefaultTheme: QuecPanelThemeConfig = {
    textColor: {
        level1: fadeTextColor(defaultTextColor, 1),
        level2: fadeTextColor(defaultTextColor, 0.6),
        level3: fadeTextColor(defaultTextColor, 0.4),
        level4: fadeTextColor(defaultTextColor, 0.2),
        stamp: fadeTextColor(defaultTextColor, 0.04),
    },
    lineColor: {
        hard: fadeTextColor(defaultTextColor, 0.1),
        light: fadeTextColor(defaultTextColor, 0.05),
    },
    bgColor: '#f7f8fc',
    fgColor: '#fff',
    pressColor: fadeTextColor(black, 0.16),
    maskColor: fadeTextColor(black, 0.4),
    primaryColor: '#0091FF',
    successColor: '#00CF63',
    warningColor: '#ff6600',
    dangerColor: '#ff4219',
    shadowColor: 'rgb(8, 15, 25)',
    borderColor: '#080F19',
    disableColor: '#E6E7E8',
    sliderBgColor: '#EFF1F6',
    stepperBorderColor: fadeTextColor(black, 0.05),
};
