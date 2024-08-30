import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, ReactNode, useContext } from 'react';
import {
    Platform,
    Pressable,
    StyleProp,
    StyleSheet,
    useWindowDimensions,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native';
import { Button, ButtonProps } from '../Button';
import { Divider } from '../Divider';
import { Font, FontLevel } from '../Font';
// import { colorStringToRgba, rgbaMix } from '../utils/color';

interface titleObjType {
    title: string;
    color?: string;
    level?: FontLevel;
    style?: StyleProp<ViewStyle>;
    icon?: ReactNode;
    iconPress?: () => void;
}
export interface PopupProps extends ViewProps {
    title?: string | ReactNode | titleObjType;
    cancel?: string | ReactNode;
    cancelPress?: () => void;
    confirm?: string | ReactNode;
    confirmPress?: () => void;
    titleStyle?: StyleProp<ViewStyle>;
    optionsStyle?: StyleProp<ViewStyle>;
    options?: ReactNode | Array<ButtonProps>;
    optionHorizontal?: boolean;
}

export const Popup: FC<PopupProps> = ({
    title,
    cancel,
    cancelPress = () => null,
    confirm,
    confirmPress = () => null,
    titleStyle,
    children,
    options,
    optionsStyle,
    optionHorizontal = true,
    ...attributes
}) => {
    const side = 16;
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    const windowHeight = useWindowDimensions().height;
    // const windowWidth = useWindowDimensions().width;

    // 在方向未定义时根据option的数量来决定方向
    // if (options.length > 2 && optionHorizontal === undefined) {
    //     optionHorizontal = false;
    // } else if (optionHorizontal === undefined) optionHorizontal = true;
    // 设备底边的高度
    const platformStyles = StyleSheet.create({
        marginBottom: {
            ...Platform.select({
                ios: { paddingBottom: 26 },
                default: {},
            }),
        },
    });
    const titleStyles = StyleSheet.create({
        shell: {
            height: 60,
            width: '100%',
        },
        title: {
            flex: 1,
            overflow: 'hidden',
        },
        icon: {
            marginLeft: 4,
            height: 16,
            width: 16,
            overflow: 'hidden',
        },
        handle: {
            position: 'absolute',
            zIndex: 10,
        },
    });
    const optionHorizontalItemStyles = StyleSheet.create({
        true: { height: 52, flex: 1, flexDirection: 'row' },
        false: {},
    });
    const flexDirectionStyles = StyleSheet.create({
        true: { display: 'flex', flexDirection: 'row' },
        false: { display: 'flex', flexDirection: 'column' },
    });
    const optionHorizontalTouchableStyles = StyleSheet.create({
        true: { height: '100%', flex: 1 },
        false: { height: 52 },
    });
    const styles = StyleSheet.create({
        shell: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: windowHeight * 0.8,
            minHeight: windowHeight * 0.5,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: theme.fgColor,
        },
        children: {
            flex: 1,
            width: '100%',
            height: '100%',
        },
        options: {
            width: '100%',
            marginBottom: 8,
            paddingTop: 8,
        },
        center: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        base: {
            paddingLeft: side,
            paddingRight: side,
        },
    });
    const cancelHandle = () => {
        cancelPress();
    };
    const confirmHandle = () => {
        confirmPress();
    };
    const getTitleCell = () => {
        const corner = (item, color, press, style) => (
            <Pressable style={[titleStyles.handle, style, styles.center, { height: '100%' }]} onPress={press}>
                {typeof item === 'string' ? (
                    <Font color={color} level="m10">
                        {item}
                    </Font>
                ) : (
                    item
                )}
            </Pressable>
        );
        return (
            <>
                {/* <View style={[titleStyles.shell, styles.base, flexDirectionStyles['true'], styles.center, titleStyle]}>
                    {corner(cancel, theme.textColor, cancelHandle, { left: side })}
                    <View style={[styles.center, titleStyles.title, flexDirectionStyles['true'], title?.style ?? null]}>
                        <Font level={'h1'} color={title?.color ?? theme.textColor}>
                            {title?.title ?? title}
                        </Font>
                        {title?.icon ? (
                            <Pressable onPress={title?.iconPress ?? null} style={[titleStyles.icon]}>
                                {title?.icon}
                            </Pressable>
                        ) : (
                            <></>
                        )}
                    </View>
                    {corner(confirm, theme.primaryColor, confirmHandle, { right: side })}
                </View> */}
                <Divider style={{ flex: -1, paddingBottom: 8 }} />
            </>
        );
    };
    const renderItem = (item) => {
        return (
            <Button
                title={item.title}
                onPress={item?.onPress ?? null}
                round={item?.round ?? undefined}
                style={[optionHorizontalTouchableStyles[optionHorizontal.toString()], item.style]}
                fontProps={
                    item?.fontProps ?? {
                        level: item?.fontProps?.level ?? 'h1',
                    }
                }
            />
        );
    };
    const getBottomCell = () => {
        // if (!(options instanceof Array) && (options?.$$typeof ?? false)) return options;
        if (options instanceof Array)
            return options.map((item, index) => {
                return (
                    <>
                        <View style={[optionHorizontalItemStyles[optionHorizontal.toString()]]} key={index}>
                            {renderItem(item)}
                        </View>
                        {options.length - 1 !== index ? <View style={{ width: 12, height: 4 }} /> : <></>}
                    </>
                );
            });
        throw new Error('option 类型或格式不正确');
    };

    return (
        <View
            style={[styles.shell, flexDirectionStyles['false'], styles.center, platformStyles.marginBottom]}
            {...attributes}
        >
            {typeof title === 'undefined' ? <></> : getTitleCell()}
            <View style={[styles.children, styles.base]}>{children}</View>
            {typeof options === 'undefined' ? (
                <></>
            ) : (
                <>
                    <View
                        style={[
                            styles.options,
                            styles.base,
                            flexDirectionStyles[optionHorizontal.toString()],
                            optionsStyle,
                        ]}
                    >
                        {getBottomCell()}
                    </View>
                </>
            )}
        </View>
    );
};
