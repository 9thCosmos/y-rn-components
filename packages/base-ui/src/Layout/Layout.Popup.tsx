import React, { FC, ReactNode } from 'react';
import { StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { Divider } from '../Divider';
import { LayoutBase } from './Layout';

export interface LayoutPopupProps extends ViewProps {
    style?: ViewStyle;
    topNode?: ReactNode;
    bottomNode?: ReactNode;
}
export const LayoutPopup: FC<LayoutPopupProps> = ({ style, children, topNode, bottomNode, ...args }) => {
    const styles = StyleSheet.create({
        bottomShell: { paddingBottom: 34 },
        line: { height: 8, backgroundColor: '#FAFAFA' },
        shell: { borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: 'hidden' },
    });

    return (
        <LayoutBase widthFull column style={[styles.shell, style]} {...args}>
            {topNode || null}
            {topNode && <Divider />}
            <LayoutBase widthFull>{children}</LayoutBase>
            <LayoutBase widthFull style={[styles.line]} />
            {bottomNode || null}
            <LayoutBase widthFull column style={[styles.bottomShell]} />
        </LayoutBase>
    );
};

LayoutPopup.displayName = 'Layout.Popup';
