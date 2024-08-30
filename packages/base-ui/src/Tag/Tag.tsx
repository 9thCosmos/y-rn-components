import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import chroma from 'chroma-js';
import React, { FC, useContext } from 'react';
import { Text, View, ViewProps } from 'react-native';

export interface TagProps extends ViewProps {
    size?: SizeType | number;
    title?: string;
    color?: ColorType | string;
    type?: TagType;
    round?: boolean;
}

type SizeType = 'small' | 'normal' | 'large';
type ColorType = 'primary' | 'success' | 'warning' | 'danger';
type TagType = 'default' | 'outlined' | 'dashed' | 'ghost';

const sizeMap: Record<SizeType, number> = {
    small: 20,
    normal: 25,
    large: 28,
};

const fontSizeMap: Record<SizeType, number> = {
    small: 10,
    normal: 12,
    large: 14,
};

export const Tag: FC<TagProps> = ({ size = 'normal', title, color = 'primary', type = 'default', round, ...props }) => {
    const _size = sizeMap[size];
    if (!_size) throw new Error('Invalid size');
    const fontSize = fontSizeMap[size];

    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);

    const mainColorMap: Record<ColorType, string> = {
        primary: theme.primaryColor,
        success: theme.successColor,
        warning: theme.warningColor,
        danger: theme.dangerColor,
    };
    let mainColor = mainColorMap[color];

    if (!mainColor) {
        if (chroma.valid(color)) {
            mainColor = color;
        } else {
            throw new Error(`Invalid color: ${color}`);
        }
    }

    const bgColorMap: Record<TagType, string> = {
        default: mainColor,
        outlined: 'transparent',
        dashed: 'transparent',
        ghost: chroma(mainColor).alpha(0.1).css(),
    };
    const bgColor = bgColorMap[type];

    const titleColorMap: Record<TagType, string> = {
        default: '#fff',
        outlined: mainColor,
        dashed: mainColor,
        ghost: mainColor,
    };
    const titleColor = titleColorMap[type];

    const borderStyleMap: Record<TagType, ViewProps['style']> = {
        default: {},
        outlined: {
            borderWidth: 1,
            borderColor: mainColor,
        },
        dashed: {
            borderWidth: 1,
            borderColor: mainColor,
            borderStyle: 'dashed',
        },
        ghost: {
            borderWidth: 1,
            borderColor: mainColor,
        },
    };
    const borderStyle = borderStyleMap[type];

    return (
        <View
            {...props}
            style={[
                {
                    height: _size,
                    borderRadius: round ? _size / 2 : 4,
                    backgroundColor: bgColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: fontSize - 4,
                },
                borderStyle,
                props.style,
            ]}
        >
            <Text
                style={{
                    fontSize: fontSize,
                    lineHeight: fontSize * 1.4,
                    color: titleColor,
                }}
            >
                {title}
            </Text>
        </View>
    );
};
