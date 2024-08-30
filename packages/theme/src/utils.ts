import chroma from 'chroma-js';
import {
    BrandColorName,
    ErrorColorName,
    NeutralColorName,
    QPTheme,
    QPThemeConfig,
    SuccessColorName,
    WarningColorName,
} from './types';

const alphaHex = (hex: string, alpha: number) => chroma(hex).alpha(alpha).hex();

const createNeutralColors = (props: {
    textBaseColor: string;
    borderColor: string;
    pageBgColor: string;
    containerBgColor: string;
    modalBaseColor: string;
}): Record<NeutralColorName, string> => {
    const { textBaseColor, borderColor, pageBgColor, containerBgColor, modalBaseColor } = props;
    return {
        gy1: alphaHex(textBaseColor, 1),
        gy2: alphaHex(textBaseColor, 0.6),
        gy3: alphaHex(textBaseColor, 0.4),
        gy4: alphaHex(textBaseColor, 0.2),
        gy5: alphaHex(textBaseColor, 0.1),
        gy6: alphaHex(borderColor, 1),
        gy7: alphaHex(pageBgColor, 1),
        gy8: alphaHex(containerBgColor, 1),
        gy9: alphaHex(modalBaseColor, 0.75),
        gy10: alphaHex(modalBaseColor, 0.4),
        gy11: alphaHex(modalBaseColor, 0.16),
    };
};

const lightNeutralColors = createNeutralColors({
    textBaseColor: '#080f19',
    borderColor: '#f3f3f4',
    pageBgColor: '#f7f8fc',
    containerBgColor: '#fff',
    modalBaseColor: '#000',
});

const darkNeutralColors = createNeutralColors({
    textBaseColor: '#fff',
    borderColor: '#f3f3f4',
    pageBgColor: '#f7f8fc',
    containerBgColor: '#fff',
    modalBaseColor: '#000',
});

const createFeatureColors = <T extends string>(baseColor: string, names: T[]): Record<T, string> => {
    return {
        [names[0]]: chroma.mix(baseColor, '#000', 0.16, 'rgb').hex(),
        [names[1]]: alphaHex(baseColor, 1),
        [names[2]]: alphaHex(baseColor, 0.48),
        [names[3]]: alphaHex(baseColor, 0.12),
    } as Record<T, string>;
};

export const createQPThemeContext = (config: QPThemeConfig): QPTheme => {
    // 颜色合法校验
    for (const [key, value] of Object.entries(config)) {
        if (key !== 'type' && !chroma.valid(value)) {
            throw new Error(`Invalid color value: ${value}`);
        }
    }
    const neutralColors = config.type === 'dark' ? darkNeutralColors : lightNeutralColors;
    const { brandColor, errorColor, warningColor, successColor } = config;
    return {
        color: {
            ...createFeatureColors<BrandColorName>(brandColor, ['brand0', 'brand1', 'brand2', 'brand3']),
            ...createFeatureColors<ErrorColorName>(errorColor, ['error0', 'error1', 'error2', 'error3']),
            ...createFeatureColors<WarningColorName>(warningColor, ['warning0', 'warning1', 'warning2', 'warning3']),
            ...createFeatureColors<SuccessColorName>(successColor, ['success0', 'success1', 'success2', 'success3']),
            ...neutralColors,
        },
    };
};
