import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { cloneElement, FC, ReactNode, useContext, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, useWindowDimensions, View, ViewProps, ViewStyle } from 'react-native';
import { Overlay } from '../Overlay';

type PositionType = 'left' | 'right' | 'top' | 'bottom';
export interface PopoverContentProps extends ViewProps {
    content?: ReactNode;
    // [position,[x,y],[heightAndWidth（h,x）:主内容的长宽]]
    message: any[];
    setPosition?: () => void;
    style?: StyleProp<ViewStyle>;
}
export interface PopoverProps extends ViewProps {
    style?: StyleProp<ViewStyle>;
    position?: PositionType;
    onPress?: () => void;
    handleVisible: (value: boolean) => void;
    dividerColor?: string;
    visible: boolean;
    content?: ReactNode;
    hasOverlay?: boolean;
    // [position,[x,y],[heightAndWidth（h,x）:主内容的长宽]]
    setPosition?: (value: any[]) => void; //焦点左上角的[x,y]
}
interface ShadowBoxProps {
    children?: React.ReactNode;
    shadowColor?: string;
    style?: StyleProp<ViewStyle>;
}

// 阴影
const ShadowBox: FC<ShadowBoxProps> = ({ children, shadowColor = 'rgb(8, 15, 25)', style }) => {
    return <View style={[{ elevation: 10 }, style]}>{children}</View>;
};

export const PopoverContent: FC<PopoverContentProps> = ({ message, style, content = null }) => {
    if (typeof message === 'undefined') {
        return <></>;
    } else {
        const position = message[0];
        const XY = message[1];
        const heightAndWidth = message[2];
        const insideStyles = StyleSheet.create<Record<PositionType, any>>({
            left: { right: 0 },
            right: { left: 0 },
            top: { bottom: 0 },
            bottom: { top: 0 },
        });
        const positionStyles = StyleSheet.create<Record<PositionType, any>>({
            left: { top: XY[1], left: XY[0] },
            right: { top: XY[1], left: XY[0] + heightAndWidth[1] },
            top: { left: XY[0], top: XY[1] },
            bottom: { left: XY[0], top: XY[1] + heightAndWidth[0] },
        });
        const styles = StyleSheet.create({
            shell: {
                position: 'absolute',
                zIndex: 100,
            },
            center: {
                justifyContent: 'center',
                alignItems: 'center',
            },
        });
        return (
            <View style={[styles.shell, positionStyles[position]]}>
                <View style={[{ position: 'absolute' }, insideStyles[position], style]}>{content}</View>
            </View>
        );
    }
};

export const Popover: FC<PopoverProps> = ({
    style,
    content = null,
    children,
    handleVisible,
    visible = false,
    hasOverlay = false,
    // hasArrow = false,
    position = 'bottom',
    setPosition,
}) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const styles = StyleSheet.create({
        center: {
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    const getComponentSize = ({ nativeEvent }) => {
        setHeightAndWidth([nativeEvent.layout.height, nativeEvent.layout.width]);
    };
    const getComponentPosition = ({ nativeEvent }) => {
        const nE = nativeEvent;
        const [x, y] = [nE?.locationX ?? nE?.layerX, nE?.locationY ?? nE?.layerY];
        computeDirection([nE.pageX - x, nE.pageY - y]);
        setPosition && setPosition([position, [nE.pageX - x, nE.pageY - y], heightAndWidth]);
    };
    const [heightAndWidth, setHeightAndWidth] = useState([0, 0]);
    const [direction, setDirection] = useState([0, 0, 0, 0]);

    const hasPressArray = [
        'Button',
        'PanResponder',
        'Pressable',
        'ScrollView',
        'Text',
        'TextInput',
        'TouchableHighlight',
        'TouchableOpacity',
        'TouchableNativeFeedback',
        'TouchableWithoutFeedback',
        'View',
    ];
    // 劫持子组件
    const cloneChild = (children) => {
        if (hasPressArray.includes(children.type.displayName) || children.props.onPress) {
            const props = { ...children.props };
            props.onPress = (PressEvent) => {
                getComponentPosition(PressEvent);
                children?.props?.onPress(PressEvent);
            };
            const grandSon = <View pointerEvents="none">{children.props.children}</View>;
            const childrenClone = cloneElement(children, props, grandSon);
            return childrenClone;
        } else {
            return (
                <Pressable
                    pointerEvents="box-only"
                    onPress={(e) => {
                        getComponentPosition(e);
                    }}
                >
                    {children}
                </Pressable>
            );
        }
    };
    const childrenClone = cloneChild(children);

    const computeDirection = (componentPositionArr) => {
        switch (position) {
            case 'left':
                setDirection([componentPositionArr[1], windowWidth - componentPositionArr[0], 0, 0]);
                break;
            case 'right':
                setDirection([componentPositionArr[1], 0, 0, componentPositionArr[0] + heightAndWidth[1]]);
                break;
            case 'top':
                setDirection([0, 0, windowHeight - componentPositionArr[1], componentPositionArr[0]]);
                break;
            case 'bottom':
                setDirection([componentPositionArr[1] + heightAndWidth[0], 0, 0, componentPositionArr[0]]);
                break;
            default:
                setDirection([0, 0, 0, 0]);
                break;
        }
    };
    const absoluteShellStyles = StyleSheet.create<Record<PositionType, any>>({
        left: { right: direction[1], top: direction[0] },
        right: { left: direction[3], top: direction[0] },
        top: { left: direction[3], bottom: direction[2] },
        bottom: { left: direction[3], top: direction[0] },
    });
    const getOverlay = (
        <Overlay
            maskPressIn={() => {
                handleVisible(false);
            }}
            visible={visible}
            maskColor={'transparent'}
        >
            <View style={[{ position: 'absolute' }, absoluteShellStyles[position]]}>
                <ShadowBox shadowColor={theme.shadowColor} style={style}>
                    {content}
                </ShadowBox>
            </View>
        </Overlay>
    );
    // const getNotOverlayStyles = StyleSheet.create<Record<PositionType, any>>({
    //     left: { right: 0 },
    //     right: { left: heightAndWidth[1] },
    //     top: { bottom: 0 },
    //     bottom: { top: heightAndWidth[0] },
    // });

    return (
        <View>
            <View>
                <View onLayout={getComponentSize}>{childrenClone}</View>
            </View>
            {hasOverlay ? getOverlay : <></>}
        </View>
    );
};
