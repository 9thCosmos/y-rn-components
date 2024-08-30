import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import chroma from 'chroma-js';
import React, { FC, ReactNode, useContext, useState } from 'react';
import { StyleSheet, TouchableHighlight, TouchableHighlightProps, ViewStyle } from 'react-native';
import { Font } from '../Font';
import { Layout } from '../Layout';

export interface CellButtonProps extends TouchableHighlightProps {
    title?: string | ReactNode;
    description?: string | ReactNode;
    onPress?: () => void;
    fontColor?: string;
    style?: ViewStyle;
    leftSideIconStyle?: ViewStyle;
    rightSideIconStyle?: ViewStyle;
}

export const CellButton: FC<CellButtonProps> = ({
    title,
    description,
    style,
    fontColor,
    onPress = () => null,
    disabled = false,
    underlayColor,
    ...args
}) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext); //主题色
    const styles = StyleSheet.create({
        touchableHighlightShell: {
            // width: '100%',
            flex: 1,
            // backgroundColor: theme.fgColor,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 16,
        },
        title: {},
    });
    const pressColor: string = chroma('#1E1E1E').hex();
    const disableColor: string = chroma(theme.textColor.level1).alpha(0.1).hex();
    const [press, setPress] = useState<boolean>(false);

    // #080F19    10%
    return (
        <TouchableHighlight
            onPress={disabled ? null : onPress}
            disabled={disabled}
            style={[styles.touchableHighlightShell, style]}
            underlayColor={underlayColor ?? theme.pressColor}
            {...args}
            // 等ui更新了再写入theme
            // activeOpacity={0}
            // onShowUnderlay={() => !disabled && setPress(true)}
            // onHideUnderlay={() => setPress(false)}
        >
            <Layout widthFull heightFull center column>
                {React.isValidElement(title) ? (
                    title
                ) : (
                    <Font level="m10" color={fontColor || (disabled ? disableColor : undefined)}>
                        {title}
                    </Font>
                )}
                {React.isValidElement(description) ? (
                    description
                ) : (
                    <Font level="m10" color={fontColor || (disabled ? disableColor : undefined)}>
                        {description}
                    </Font>
                )}
            </Layout>
        </TouchableHighlight>
    );
};
CellButton.displayName = 'Cell.Button';
