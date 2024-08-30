import { LayoutBase, LayoutBaseProps } from './Layout';
import { LayoutCell, LayoutCellProps } from './Layout.Cell';
import { LayoutPopup, LayoutPopupProps } from './Layout.Popup';

export const Layout = Object.assign(LayoutBase, {
    Cell: LayoutCell,
    Popup: LayoutPopup,
    // Actions: LayoutActions,
    // Button: LayoutButton,
});

export type { LayoutBaseProps, LayoutCellProps, LayoutPopupProps };
