import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, useContext } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    ModalProps,
    Platform,
    Pressable,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';

type positionType = 'center' | 'top' | 'bottom' | 'left' | 'right';

export interface OverlayProps extends ModalProps {
    maskColor?: string;
    maskPressIn?: () => void;
    maskStyle?: StyleProp<ViewStyle> | undefined;
    style?: StyleProp<ViewStyle> | undefined;
    visible: boolean;
    position?: positionType | undefined;
}

export const OverlayBase: FC<OverlayProps> = ({
    visible = false,
    maskPressIn = () => null,
    transparent = true,
    maskColor,
    children,
    maskStyle,
    position,
    style,
    ...attributes
}) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    const getBehaviorType = Platform.OS === 'ios' ? 'padding' : 'height';
    const modelBg = maskColor || theme.maskColor;
    const styles = StyleSheet.create({
        backdrop: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: modelBg,
        },
    });
    const positionStyle = StyleSheet.create<Record<positionType, any>>({
        center: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        bottom: {
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        top: {
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        left: {
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        right: {
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
    });
    return (
        <Modal visible={visible} onRequestClose={maskPressIn} transparent={transparent} {...attributes}>
            <Pressable
                style={StyleSheet.flatten([styles.backdrop, maskStyle])}
                onPressIn={() => {
                    maskPressIn();
                }}
            />
            <KeyboardAvoidingView
                style={[{ flex: 1 }, positionStyle[position], style]}
                pointerEvents="box-none"
                behavior={getBehaviorType}
            >
                {children}
            </KeyboardAvoidingView>
        </Modal>
    );
};
