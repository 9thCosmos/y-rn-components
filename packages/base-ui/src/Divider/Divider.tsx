import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, ReactNode, useContext } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Font } from '../Font/index';
// import { colorStringToRgba, rgbaMix } from '../utils/color';
import chroma from 'chroma-js';

export interface DividerProps extends ViewProps {
    color?: string;
    weight?: number;
    subText?: string | ReactNode;
    textColor?: string;
    vertical?: boolean;
}

export const Divider: FC<DividerProps> = ({
    color,
    weight = 0.5,
    subText,
    vertical = false,
    textColor,
    style,
    ...attributes
}) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    // TODO 类型确认，临时忽略
    // @ts-ignore
    const baseColor = chroma.mix(
        chroma(theme.fgColor).alpha(1),
        chroma(theme.textColor.level1).alpha(0.05),
        0.5,
        'rgb'
    );
    textColor = textColor ?? String(baseColor);
    color = color ?? String(baseColor);
    const styles = StyleSheet.create({
        shellInside: {
            flex: 1,
            flexDirection: 'row',
            width: '100%',
        },
        line: {
            flex: 1,
            height: weight,
            backgroundColor: color,
        },
        text: {
            paddingHorizontal: 16,
        },
        center: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        verticalLine: {
            width: weight,
            backgroundColor: color,
            position: 'relative',
            top: 0,
            bottom: 0,
        },
        verticalLineInside: {},
    });
    const getChild = (subText) => {
        if (React.isValidElement(subText)) return subText;
        if (typeof subText === 'string')
            return (
                <Font level="m10" color={textColor} style={[styles.text]}>
                    {subText}
                </Font>
            );
        return null;
    };
    const verticalComponent = (style) => (
        <View style={[styles.verticalLine, style]}>{/* <View style={[styles.verticalLineInside]} /> */}</View>
    );

    return vertical ? (
        verticalComponent(style)
    ) : (
        <View style={[styles.shellInside, styles.center, style]} {...attributes}>
            <View style={[styles.line]}></View>
            {getChild(subText)}
            <View style={[styles.line]}></View>
        </View>
    );
};
