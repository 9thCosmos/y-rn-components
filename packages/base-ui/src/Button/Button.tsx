import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import chroma from 'chroma-js';
import React, { FC, ReactNode, useContext, useState } from 'react';
import {
    StyleProp,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedbackProps,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from 'react-native';
import { Font, FontProps } from '../Font';

type ButtonType = 'solid' | 'outline' | 'text';
type SizeType = 'small' | 'normal' | 'large';
type RoundType = 'full' | 'middle' | 'small';
export interface ButtonProps extends TouchableOpacityProps, TouchableNativeFeedbackProps {
    title: string | ReactNode;
    onPress?: () => void;
    type?: ButtonType;
    size?: SizeType;
    icon?: string;
    color?: string;
    disabled?: boolean;
    round?: RoundType | number;
    style?: StyleProp<ViewStyle>;
    touchStyle?: StyleProp<ViewStyle>;
    fontProps?: FontProps;
    children?: ReactNode;
}

// TODO 增加color属性，支持渐变
// 加载状态
// 按钮图标
export const Button: FC<ButtonProps> = ({
    title,
    onPress = () => null,
    type = 'solid',
    disabled = false,
    round = 'full',
    size = 'normal',
    style,
    touchStyle,
    fontProps,
    children,
    color,
    ...attribute
}) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    const btnColor: string = color || theme.primaryColor;

    const styles = StyleSheet.create<Record<ButtonProps['type'], any>>({
        solid: {
            backgroundColor: btnColor,
            color: '#fff',
        },
        outline: {
            backgroundColor: '#fff',
            borderColor: btnColor,
            borderWidth: 1.5,
            color: btnColor,
        },
        text: {
            color: btnColor,
        },
    });

    const sizeMap: Record<ButtonProps['size'], number> = {
        small: 48,
        normal: 52,
        large: 56,
    };
    const radiusMap: Record<RoundType, number> = {
        small: 10,
        middle: 18,
        full: sizeMap[size] / 2,
    };
    let radius = radiusMap.full;
    if (typeof round === 'number') {
        radius = round >= 0 ? round : radiusMap.middle;
    } else if (radiusMap[round]) {
        radius = radiusMap[round];
    }

    const pressColor: Record<ButtonProps['type'], string> = {
        solid: theme.pressColor,
        outline: chroma(btnColor).alpha(0.08).hex(),
        text: '',
    };
    let textPressColor;
    if (fontProps && fontProps?.color) {
        textPressColor = chroma.mix(fontProps.color, theme.pressColor, 0.5, 'rgb').hex();
    } else {
        textPressColor = chroma.mix(btnColor, theme.pressColor, 0.5, 'rgb').hex();
    }

    const [press, setPress] = useState<boolean>(false);

    return (
        <View
            style={[
                {
                    borderRadius: radius,
                    height: sizeMap[size],
                    overflow: 'hidden',
                    opacity: disabled ? 0.3 : 1,
                },
                styles[type],
                style,
            ]}
        >
            <TouchableHighlight
                onPress={disabled ? null : onPress}
                underlayColor={pressColor[type]}
                style={[
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        paddingHorizontal: 26,
                    },
                    touchStyle,
                ]}
                onShowUnderlay={() => !disabled && setPress(true)}
                onHideUnderlay={() => setPress(false)}
                {...attribute}
            >
                {children === undefined ? (
                    <Font level="m10" color={press && type === 'text' ? textPressColor : styles[type].color}>
                        {title}
                    </Font>
                ) : (
                    children
                )}
            </TouchableHighlight>
        </View>
    );
};
