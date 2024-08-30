import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import chroma from 'chroma-js';
import React, { FC, ReactElement, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { Animated, ColorValue, Pressable, StyleProp, ViewProps, ViewStyle } from 'react-native';

type SizeType = 'small' | 'large';
type SizeObjType = { width: number; height: number };

export interface SwitchProps extends ViewProps {
    size?: SizeType | SizeObjType;
    disabled?: boolean;
    value: boolean;
    color?: string;
    centerColor?: ColorValue;
    centerChild?: ReactElement;
    closedColor?: string;
    style?: StyleProp<ViewStyle>;
    onValueChange?: (value: boolean) => void;
}

const sizeMap: Record<SizeType, SizeObjType> = {
    small: {
        width: 48,
        height: 28,
    },
    large: {
        width: 60,
        height: 34,
    },
};

export const Switch: FC<SwitchProps> = ({
    size = 'small',
    disabled = false,
    value,
    onValueChange,
    color,
    closedColor,
    centerColor = 'white',
    style = {},
    centerChild = null,
}) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext); //主题色

    const truthyColor: string = useMemo(() => {
        let _color = theme?.[color + 'Color'] || color || theme.primaryColor;
        // TODO, disabled状态下，颜色变浅, brighten算法？
        if (disabled) {
            _color = chroma(_color).alpha(0.12).hex();
        }
        return _color;
    }, [color, theme]);

    // TODO 关闭色跟随文字？或纳入规范？
    const falsyColor: string = useMemo(() => {
        let _color = closedColor || chroma(theme.textColor.level1).alpha(0.2).hex();
        if (disabled) {
            _color = chroma(_color).alpha(0.12).hex();
        }
        return _color;
    }, [theme]);

    const innerMarginLeft: number = useMemo(() => {
        if (typeof size !== 'string') {
            return size.width - size.height;
        }
        return sizeMap[size].width - sizeMap[size].height;
    }, [size]);

    const marginLeftAnim = useRef(new Animated.Value(value ? innerMarginLeft : 0)).current;
    const backgroundColorAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

    const toggleSwitch = useCallback(() => {
        if (disabled) return;
        onValueChange && onValueChange(!value);
    }, [value]);

    useEffect(() => {
        Animated.timing(marginLeftAnim, {
            toValue: !value ? 0 : innerMarginLeft,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(backgroundColorAnim, {
            toValue: !value ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [value]);

    const sizeIsString: boolean = useMemo(() => typeof size === 'string', [size]);
    const sizeWidth: number = useMemo(
        () => (sizeIsString ? sizeMap[size as string].width : (size as SizeObjType).width),
        [sizeIsString]
    );
    const sizeHeight: number = useMemo(
        () => (sizeIsString ? sizeMap[size as string].height : (size as SizeObjType).height),
        [sizeIsString]
    );

    return (
        <Pressable onPress={toggleSwitch} style={style}>
            <Animated.View
                style={{
                    width: sizeWidth,
                    height: sizeHeight,
                    borderRadius: sizeHeight / 2,
                    backgroundColor: backgroundColorAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [falsyColor, truthyColor],
                    }),
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 2,
                }}
            >
                <Animated.View
                    style={[
                        {
                            width: sizeHeight - 4,
                            height: sizeHeight - 4,
                            borderRadius: sizeHeight / 2 - 2,
                            backgroundColor: centerColor,
                            marginLeft: marginLeftAnim,
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    ]}
                >
                    {centerChild}
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
};
