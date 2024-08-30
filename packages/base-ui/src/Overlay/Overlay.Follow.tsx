import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { OverlayBase, OverlayProps } from './Overlay';
type PositionType = 'left' | 'right' | 'top' | 'bottom';

export interface OverlayFollowProps extends OverlayProps {
    content?: ReactNode;
    arrow?: boolean;
    position?: PositionType;
}

export const OverlayFollow: FC<OverlayFollowProps> = ({
    position = 'bottom',
    arrow = false,
    children,
    content,
    maskColor,
    ...attributes
}) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    const { width, height } = useWindowDimensions();

    const [childPosition, setChildPosition] = useState({ x: 0, y: 0, w: 0, h: 0 });
    const absoluteShellStyles = StyleSheet.create<Record<PositionType, any>>({
        left: { right: width - childPosition.x, top: childPosition.y },
        right: { left: childPosition.x + childPosition.w, top: childPosition.y },
        top: { left: childPosition.x, bottom: height - childPosition.y },
        bottom: { left: childPosition.x, top: childPosition.y + childPosition.h },
    });
    const shell = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            shell.current.measure((x, y, width, height, pageX, pageY) => {
                setChildPosition({ x: pageX, y: pageY, w: width, h: height });
                console.log(x, y, width, height, pageX, pageY);
            });
        }, 0);
    }, []);
    return (
        <View ref={shell}>
            {children}
            <OverlayBase
                maskColor={maskColor || 'transparent'}
                {...attributes}
                style={[{ position: 'absolute' }, absoluteShellStyles[position]]}
            >
                {content}
            </OverlayBase>
        </View>
    );
};
OverlayFollow.displayName = 'Overlay.Follow';
