import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, ReactNode, useContext } from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, View, ViewProps, ViewStyle } from 'react-native';
import { Divider } from '../Divider/index';
import { Font, FontLevel } from '../Font/index';
import { colorStringToRgba, rgbaMix } from '../utils/color';

interface bottomContentInter {
    text: ReactNode;
    onPress?: () => void;
    color?: string;
    level?: FontLevel;
    style?: StyleProp<ViewStyle> | undefined;
}
export interface DialogProps extends ViewProps {
    title?: string | ReactNode;
    titleColor?: string;
    titleStyle?: StyleProp<ViewStyle> | undefined;
    content?: string | ReactNode;
    contentColor?: string;
    contentStyle?: StyleProp<ViewStyle> | undefined;
    options?: ReactNode | Array<bottomContentInter>;
    optionStyle?: StyleProp<ViewStyle> | undefined;
    optionHorizontal?: boolean;
}

export const Dialog: FC<DialogProps> = ({
    title,
    titleColor,
    titleStyle,
    content,
    contentColor,
    contentStyle,
    style,
    children,
    options,
    optionStyle,
    optionHorizontal,
}) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    const flexDirectionStyles = StyleSheet.create({
        true: { flexDirection: 'row' },
        false: { flexDirection: 'column' },
    });
    const optionHorizontalItemStyles = StyleSheet.create({
        true: { height: 56, flex: 1, flexDirection: 'row' },
        false: {},
    });
    const optionHorizontalTouchableStyles = StyleSheet.create({
        true: { height: '100%', flex: 1 },
        false: { height: 56 },
    });
    const styles = StyleSheet.create({
        shell: {
            backgroundColor: theme.fgColor,
            borderRadius: 16,
            width: 291,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        },
        main: {
            paddingTop: 24,
            paddingBottom: 24,
        },
        title: {
            marginBottom: 12,
        },
        base: {
            paddingLeft: 18,
            paddingRight: 18,
        },
        center: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        item: {
            height: 56,
            flex: 1,
        },
        option: {
            width: '100%',
            display: 'flex',
        },
    });

    if (Array.isArray(options) && options.length > 2 && optionHorizontal === undefined) {
        optionHorizontal = false;
    } else if (optionHorizontal === undefined) optionHorizontal = true;
    const textColor = theme.textColor.level1;
    // TODO 类型确认，临时忽略
    // @ts-ignore
    const contentDefaultColor = rgbaMix(colorStringToRgba(theme.fgColor, 1), colorStringToRgba(textColor, 0.4));
    const getTitle = () => {
        return title === undefined ? (
            <></>
        ) : (
            <View style={[styles.title, styles.center, styles.base, contentStyle]}>
                {typeof title === 'string' ? (
                    <Font level="m10" color={titleColor ?? textColor}>
                        title
                    </Font>
                ) : (
                    title
                )}
            </View>
        );
    };
    const getContent = () => {
        const inside =
            typeof children === 'string' || typeof content === 'string' ? (
                <Font level="m10" color={contentColor ?? contentDefaultColor}>
                    {children || content}
                </Font>
            ) : (
                children || content
            );
        if (children || content) {
            return <View style={[styles.center, styles.base, titleStyle]}>{inside}</View>;
        }
        return <></>;
    };
    const renderItem = (item) => {
        let res;
        if (typeof item.text === 'string')
            res = (
                <Font level={item?.level ?? 'h1'} color={item?.color ?? theme.textColor}>
                    {item.text}
                </Font>
            );
        if (typeof item.text === 'object') {
            res = item.text;
        }
        if (res === undefined) throw new Error('传入的option参数错误');
        return res;
    };
    const getOption = () => {
        return (
            Array.isArray(options) &&
            options.map((item, index) => {
                return (
                    <View style={[optionHorizontalItemStyles[optionHorizontal.toString()]]} key={index}>
                        <TouchableHighlight
                            style={[
                                styles.center,
                                optionHorizontalTouchableStyles[optionHorizontal.toString()],
                                item.style,
                            ]}
                            onPress={item?.onPress ?? null}
                        >
                            {renderItem(item)}
                        </TouchableHighlight>
                        {Array.isArray(options) && options.length - 1 !== index ? (
                            <Divider vertical={optionHorizontal} />
                        ) : (
                            <></>
                        )}
                    </View>
                );
            })
        );
    };

    return (
        <View style={[styles.shell, style]}>
            <View style={[styles.main]}>
                {getTitle()}
                {getContent()}
            </View>
            {options ? <Divider /> : <></>}
            <View style={[styles.option, flexDirectionStyles[optionHorizontal.toString()], optionStyle]}>
                {options instanceof Array ? getOption() : options}
            </View>
        </View>
    );
};
