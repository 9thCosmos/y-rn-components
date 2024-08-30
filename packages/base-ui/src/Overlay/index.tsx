import { OverlayBase, OverlayProps } from './Overlay';
// import { OverlayActionSheet, OverlayActionSheetProps } from './Overlay.ActionSheet';
import { OverlayDialog, OverlayDialogProps } from './Overlay.Dialog';
import { OverlayFollow, OverlayFollowProps } from './Overlay.Follow';
import { OverlayPopup, OverlayPopupProps } from './Overlay.Popup';

export const Overlay = Object.assign(OverlayBase, {
    Popup: OverlayPopup,
    Follow: OverlayFollow,
    Dialog: OverlayDialog,
    // ActionSheet: OverlayActionSheet,
    // PickerBase: OverlayPickerBase,
});
export type { OverlayProps, OverlayPopupProps, OverlayDialogProps, OverlayFollowProps };
