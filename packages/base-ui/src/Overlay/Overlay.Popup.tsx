import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, ReactNode, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Font } from '../Font';
import { Layout } from '../Layout';
import { OverlayBase, OverlayProps } from './Overlay';

type optionType = { name: string; id: number; fun: () => void };
// export interface TopNodeProps {
//     title: string | ReactNode;
//     topNodeStyle: StyleProp<ViewStyle>;
// }
export interface OverlayPopupProps extends OverlayProps {
    title?: string | ReactNode;
    description?: string | ReactNode;
    cancel?: () => void;
    confirm?: () => void;
    option?: optionType[] | ReactNode;
    horizontal?: boolean;
}
// const TopNode: FC<TopNodeProps> = ({ title, topNodeStyle }) => (

// );
export const OverlayPopup: FC<OverlayPopupProps> = ({
    title,
    description,
    cancel,
    confirm,
    option,
    horizontal,
    children,
    ...attributes
}) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);

    const styles = StyleSheet.create({
        base: {
            backgroundColor: theme.fgColor,
        },
        topNodeStyle: {
            height: 60,
        },
    });
    return (
        <OverlayBase position={'bottom'} {...attributes}>
            <Layout.Popup
                style={styles.base}
                topNode={
                    <Layout.Cell center style={styles.topNodeStyle}>
                        <Font level={'m10'}>{title}</Font>
                    </Layout.Cell>
                }
                bottomNode={null}
            >
                {children}
            </Layout.Popup>
        </OverlayBase>
    );
};
OverlayPopup.displayName = 'Overlay.Popup';
