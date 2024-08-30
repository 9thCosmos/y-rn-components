import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, isValidElement, ReactNode, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Font } from '../Font';
import { Layout } from '../Layout';
import { OverlayBase, OverlayProps } from './Overlay';

type optionType = { name: string; id: number; fun: () => void };
export interface OverlayDialogProps extends OverlayProps {
    title?: string | ReactNode;
    description?: string | ReactNode;
    cancel?: () => void;
    confirm?: () => void;
    option?: optionType[] | ReactNode;
    horizontal?: boolean;
}

export const OverlayDialog: FC<OverlayDialogProps> = ({
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
        backdrop: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        base: {
            backgroundColor: theme.fgColor,
            borderRadius: 16,
            maxHeight: 300,
            overflow: 'hidden',
        },
    });
    return (
        <OverlayBase position={'center'} {...attributes}>
            <Layout column paddingVertical-18 style={[styles.base]} paddingHorizontal-24 horiz={'center'}>
                {title ? (
                    isValidElement(title) ? (
                        title
                    ) : (
                        <Font level={'m10'} style={{ textAlign: 'center' }}>
                            {title}
                        </Font>
                    )
                ) : null}
                {description ? (
                    isValidElement(description) ? (
                        description
                    ) : (
                        <Font level={'m10'}>{description}</Font>
                    )
                ) : null}
            </Layout>
            {cancel || confirm || option ? (
                <Layout column={!!option}>
                    {/* {option.map(item=>(
                        //跟ui商量之后考虑拓展button
                    ))} */}
                </Layout>
            ) : null}
        </OverlayBase>
    );
};
OverlayDialog.displayName = 'Overlay.Dialog';
