import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';

export const colorStringToRgba = (color: string, opacity?: number): string => {
    const validHex = /^#([0-9A-F]{3}){1,2}$/i.test(color);
    const validRgb = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i.test(color);
    const validRgba = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*(0?\.\d+|1))?\)$/i.test(color);

    if (validHex && opacity !== undefined) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
        const g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
        const b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    if (validRgb && opacity !== undefined) {
        const rgb = color.replace('rgb(', '').replace(')', '').split(',');
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
    }

    if (validRgba) {
        const rgba = color.replace('rgba(', '').replace(')', '').split(',');
        if (opacity !== undefined || rgba[3] !== undefined) {
            return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${opacity || rgba[3]})`;
        } else throw new Error('There is not opacity in rgba color string');
    }

    throw new Error('Invalid color string or opacity is not exist');
};
export const getColorOpacity = (color: string): number => {
    const validHex = /^#([0-9A-F]{3}){1,2}$/i.test(color);
    const validRgb = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i.test(color);
    const validRgba = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*(0?\.\d+|1))?\)$/i.test(color);
    if (validHex) return 1;
    if (validRgb) return 1;
    if (validRgba) {
        const res = color.replace('rgba(', '').replace(')', '').split(',')[3];
        if (res !== undefined) return Number(res);
    }
    throw new Error('Invalid color string , so opacity is not exist');
};

export const rgbaMix = (bgRgba: string, fgRgba: string): string => {
    const bg = bgRgba.replace('rgba(', '').replace(')', '').split(',');
    const fg = fgRgba.replace('rgba(', '').replace(')', '').split(',');

    const bAlpha = Number(bg[3]);
    const fAlpha = Number(fg[3]);
    const resultAlpha = fAlpha + bAlpha * (1 - fAlpha);

    const resultR = Math.round((Number(fg[0]) * fAlpha + Number(bg[0]) * bAlpha * (1 - fAlpha)) / resultAlpha);
    const resultG = Math.round((Number(fg[1]) * fAlpha + Number(bg[1]) * bAlpha * (1 - fAlpha)) / resultAlpha);
    const resultB = Math.round((Number(fg[2]) * fAlpha + Number(bg[2]) * bAlpha * (1 - fAlpha)) / resultAlpha);

    return `rgba(${resultR}, ${resultG}, ${resultB}, ${resultAlpha})`;
};

export const rgbaMixFgColor1 = (
    theme: QuecPanelThemeConfig,
    colorName: string,
    color: string,
    opacity: number
): string => rgbaMix(colorStringToRgba(theme[colorName], 1), colorStringToRgba(color, opacity));
