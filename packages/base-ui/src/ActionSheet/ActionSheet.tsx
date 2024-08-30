import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, useContext } from 'react';
import { Cell, CellButtonProps } from '../Cell';
import { Layout } from '../Layout';
import { Overlay, OverlayPopupProps } from '../Overlay';

export interface Actions extends CellButtonProps {
    id: number;
}
export interface ActionSheetProps extends OverlayPopupProps {
    data?: Actions[];
}

export const ActionSheet: FC<ActionSheetProps> = ({ data = [], ...attributes }) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext); //主题色

    return (
        <Overlay.Popup position={'bottom'} {...attributes}>
            <Layout column widthFull heightFull>
                {data.map((item) => (
                    <Cell.Button key={item.id} {...item} />
                ))}
            </Layout>
        </Overlay.Popup>
    );
};
