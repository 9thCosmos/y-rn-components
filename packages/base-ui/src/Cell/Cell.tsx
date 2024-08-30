import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, isValidElement, ReactNode, useContext } from 'react';
import {
    ColorValue,
    StyleProp,
    StyleSheet,
    TouchableHighlight,
    TouchableHighlightProps,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Button, ButtonProps } from '../Button/index';
import { Font, FontLevel, FontProps } from '../Font/index';
import { Switch, SwitchProps } from '../Switch/index';
import { colorStringToRgba, rgbaMix } from '../utils/color';

type IconType = 'switch' | 'button' | 'arrow' | ReactNode;
type SwitchPropAliasesNameArr = 'size' | 'disabled' | 'value' | 'color' | 'closedColor' | 'onValueChange';
type ButtonPropAliasesNameArr =
    | 'title'
    | 'onPress'
    | 'type'
    | 'size'
    | 'icon'
    | 'color'
    | 'disabled'
    | 'round'
    | 'style'
    | 'touchStyle'
    | 'fontProps';
type SwitchPropAliases = {
    [K in SwitchPropAliasesNameArr]: `switch${Capitalize<string & K>}`;
};
type ButtonPropAliases = {
    [K in ButtonPropAliasesNameArr]: `button${Capitalize<string & K>}`;
};
// type SwitchPropAliases = {
//     size: 'switchSize';
// // 使用映射类型映射到新的属性名
type SwitchIconProps = {
    rightIcon: 'switch';
} & { [K in keyof SwitchPropAliases as K extends keyof SwitchPropAliases ? SwitchPropAliases[K] : K]: SwitchProps[K] };

type ButtonIconProps = {
    rightIcon: 'button';
} & { [K in keyof ButtonPropAliases as K extends keyof ButtonPropAliases ? ButtonPropAliases[K] : K]: ButtonProps[K] };

export type CellPropsBase = TouchableHighlightProps & {
    rightIcon?: IconType;
    rightIconColor?: ColorValue;
    leftIcon?: ReactNode;
    title?: string | ReactNode;
    description?: string | ReactNode;
    containStyle?: ViewStyle;
    leftSideIconStyle?: ViewStyle;
    rightSideIconStyle?: ViewStyle;
    titleFontProps?: FontProps;
    disabled?: boolean;
    descriptionFontProps?: FontProps;
    value?: string | ReactNode;
    valueFontProps?: FontProps;
};
// export type CellProps = CellPropsBase &
//     (SwitchIconProps extends { sideIcon: 'switch' } ? SwitchIconProps : object) &
//     (ButtonIconProps extends { sideIcon: 'button' } ? ButtonIconProps : object);
export type CellProps = CellPropsBase | (CellPropsBase & SwitchIconProps) | (CellPropsBase & ButtonIconProps);

const commonStyles = StyleSheet.create({
    textShell: {
        flex: 1,
    },
    empty: {
        width: 12,
        height: 6,
    },
    iconShell: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightIconShell: {
        marginLeft: 6,
    },
    leftIconShell: {
        marginRight: 6,
    },
});
// 默认箭头
const Arrow: FC<{ color?: ColorValue }> = ({ color }) => {
    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path
                d="M8 7L11.5 10.5L8 14"
                stroke={color ?? '#080F19'}
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export type CellSideIconPropsBase = ViewProps & {
    sideIcon: IconType;
    iconColor?: ColorValue;
    style: ViewStyle;
    left?: boolean;
    right?: boolean;
};
export type CellSideIconProps =
    | CellSideIconPropsBase
    | (CellSideIconPropsBase & SwitchProps)
    | (CellSideIconPropsBase & ButtonProps);
// } & (SwitchProps extends { sideIcon: 'switch' } ? SwitchProps : object) &
// (ButtonProps extends { sideIcon: 'button' } ? ButtonProps : object);
// 两边icon
export const CellSideIcon: FC<CellSideIconProps> = ({
    sideIcon,
    style = {},
    left = false,
    right = false,
    iconColor,
    ...args
}) => {
    const styleArgs: StyleProp<ViewStyle> = [
        commonStyles.iconShell,
        right ? commonStyles.rightIconShell : {},
        left ? commonStyles.leftIconShell : {},
        style,
    ];
    if (React.isValidElement(sideIcon)) {
        return sideIcon;
    }
    switch (sideIcon) {
        case 'arrow':
            return (
                <View style={styleArgs}>
                    <Arrow color={iconColor} />
                </View>
            );
        case 'switch':
            return (
                <View style={styleArgs}>
                    <Switch {...(args as SwitchProps)} />
                </View>
            );
        case 'button':
            return (
                <View style={styleArgs}>
                    <Button {...(args as ButtonProps)} />
                </View>
            );
        default:
            return <></>;
    }
};

const titleDefaultLevel: FontLevel = 'm16';
const descriptionDefaultLevel: FontLevel = 'r12';
const valueDefaultLevel: FontLevel = 'm14';

export const CellBase: FC<CellProps> = ({
    rightIcon,
    rightIconColor,
    leftIcon,
    containStyle,
    style,
    leftSideIconStyle,
    rightSideIconStyle,
    onPress,
    disabled,
    title = null,
    description = null,
    value = null,
    titleFontProps = { level: titleDefaultLevel },
    descriptionFontProps = { level: descriptionDefaultLevel },
    valueFontProps = { level: valueDefaultLevel },
    underlayColor,
    ...args
    // 再把switch从args里掏出来
}) => {
    // const { switchSize, switchDisabled, switchValue, switchColor, switchClosedColor, switchOnValueChange } =
    //     args as SwitchIconProps;
    // const {
    //     buttonSize,
    //     buttonDisabled,
    //     buttonColor,
    //     buttonTitle,
    //     buttonOnPress,
    //     buttonIcon,
    //     buttonRound,
    //     buttonStyle,
    //     buttonTouchStyle,
    //     buttonType,
    //     buttonFontProps,
    // } = args as ButtonIconProps;
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext); //主题色
    const descriptionColor = rgbaMix(colorStringToRgba(theme.fgColor, 1), '#000');
    const styles = StyleSheet.create({
        touchableHighlightShell: {
            width: '100%',
            padding: 16,
            backgroundColor: theme.fgColor,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        textShell: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
        },
        title: {},
        empty: {
            minWidth: 12,
            minHeight: 6,
            flex: 1,
        },
        description: {},
        descriptionTextAlign: {},
    });

    return (
        <TouchableHighlight
            style={[styles.touchableHighlightShell, style]}
            onPress={onPress ?? null}
            underlayColor={underlayColor ?? theme.pressColor}
            disabled={rightIcon === 'switch' || rightIcon === 'button' ? disabled ?? true : disabled ?? false}
            {...args}
        >
            <>
                {leftIcon && <CellSideIcon left style={leftSideIconStyle} sideIcon={leftIcon} />}

                <View style={[styles.textShell, containStyle]}>
                    {isValidElement(title) ? title : <Font {...titleFontProps}>{title}</Font>}
                    {description && title ? <View style={styles.empty} /> : <></>}
                    {isValidElement(description) ? description : <Font {...descriptionFontProps}>{description}</Font>}
                </View>

                {isValidElement(value) ? value : <Font {...valueFontProps}>{value}</Font>}

                {rightIcon && (
                    <CellSideIcon
                        {...(rightIcon === 'switch'
                            ? {
                                  size: (args as SwitchIconProps).switchSize,
                                  disabled: (args as SwitchIconProps).switchDisabled,
                                  value: (args as SwitchIconProps).switchValue,
                                  color: (args as SwitchIconProps).switchColor,
                                  closedColor: (args as SwitchIconProps).switchClosedColor,
                                  onValueChange: (args as SwitchIconProps).switchOnValueChange,
                              }
                            : {})}
                        {...(rightIcon === 'button'
                            ? {
                                  size: (args as ButtonIconProps).buttonSize,
                                  disabled: (args as ButtonIconProps).buttonDisabled,
                                  color: (args as ButtonIconProps).buttonColor,
                                  title: (args as ButtonIconProps).buttonTitle,
                                  onPress: (args as ButtonIconProps).buttonOnPress,
                                  icon: (args as ButtonIconProps).buttonIcon,
                                  round: (args as ButtonIconProps).buttonRound,
                                  style: (args as ButtonIconProps).buttonStyle,
                                  type: (args as ButtonIconProps).buttonType,
                                  fontProps: (args as ButtonIconProps).buttonFontProps,
                                  touchStyle: (args as ButtonIconProps).buttonTouchStyle,
                              }
                            : {})}
                        right
                        style={rightSideIconStyle}
                        sideIcon={rightIcon}
                        iconColor={rightIconColor}
                    />
                )}
            </>
        </TouchableHighlight>
    );
};
