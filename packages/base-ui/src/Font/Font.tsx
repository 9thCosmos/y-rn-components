import { ColorName, QPTheme, QPThemeContext } from '@quec/panel-theme';
import React, { FC, ReactNode, useContext } from 'react';
import { Platform, Text, TextProps, TextStyle, View } from 'react-native';
import {
    Din0,
    Din1,
    Din2,
    Din3,
    Din4,
    Din5,
    Din6,
    Din7,
    Din8,
    Din9,
    DinCelsius,
    DinColon,
    DinLine,
    DinPercent,
    DinPoint,
} from './DinSvg';

const fontSizeLevel = [28, 24, 20, 18, 16, 14, 12, 10] as const;
const fontWeightLevel = ['b', 'm', 'r', 'l'] as const;

export type FontLevel = `${(typeof fontWeightLevel)[number]}${(typeof fontSizeLevel)[number]}`;

export interface FontProps extends TextProps {
    children: ReactNode;
    level?: FontLevel;
    color?: ColorName | string;
    din?: boolean;
    // din字体的大小
    size?: number;
}

const DIN_COMPONENT_MAP = {
    '0': Din0,
    '1': Din1,
    '2': Din2,
    '3': Din3,
    '4': Din4,
    '5': Din5,
    '6': Din6,
    '7': Din7,
    '8': Din8,
    '9': Din9,
    '%': DinPercent,
    // 摄氏度处理钱需要替换为C
    C: DinCelsius,
    '-': DinLine,
    '.': DinPoint,
    ':': DinColon,
};

type FontWeightType = '600' | '500' | '400' | '300';

export const Font: FC<FontProps> = ({ children, level = 'r14', color, style, din, size = 48, ...attr }) => {
    const theme: QPTheme = useContext(QPThemeContext);
    const _color = theme.color[color] || color || theme.color.gy1;
    const fontWeightObj = {
        b: '600',
        m: '500',
        r: '400',
        l: '300',
    };

    const textWeightFn = (fontWeight: FontWeightType): TextStyle['fontWeight'] =>
        Platform.OS === 'ios' ? (Number(fontWeight) >= 500 ? 'bold' : 'normal') : fontWeight;

    const fontWeight = fontWeightObj[level[0]] as FontWeightType;
    const fontSize = parseInt(level.slice(1));
    // DIN SVG替换
    if (din) {
        const _children = React.Children.map(children, (child) => {
            if (['string', 'number'].includes(typeof child)) {
                // 替换摄氏度
                const _child = child.toString().replace(/℃/g, 'C').replace(/°C/g, 'C');
                return _child.split('').map((char, index) => {
                    const DINComponent = DIN_COMPONENT_MAP[char];
                    if (DINComponent) {
                        return <DINComponent key={index} size={size} color={_color} />;
                    }
                    return undefined;
                });
                // @ts-ignore
            } else if (child.type === Font) {
                // @ts-ignore
                const { children: __children, size: __size, color: __color } = child.props;
                return (
                    <Font din size={__size ?? size} color={__color ?? _color}>
                        {__children}
                    </Font>
                );
            }
            return undefined;
        });
        return (
            <View {...attr} style={[{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }, style]}>
                {_children}
            </View>
        );
    }
    return (
        <Text
            {...attr}
            style={[{ color: _color, fontWeight: textWeightFn(fontWeight), fontSize, lineHeight: fontSize + 8 }, style]}
        >
            {children}
        </Text>
    );
};
