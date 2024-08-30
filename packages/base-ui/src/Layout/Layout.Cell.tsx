import React, { FC, ReactNode, useRef, useState } from 'react';
import { StyleProp, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { LayoutBase, LayoutBaseProps } from './Layout';

// export interface LayoutProps extends ViewProps {}
export interface LayoutCellProps extends ViewProps {
    style?: StyleProp<ViewStyle>;
    leftNode?: ReactNode;
    leftProps?: LayoutBaseProps;
    rightNode?: ReactNode;
    rightProps?: LayoutBaseProps;
    childrenProps?: LayoutBaseProps;
    center?: boolean;
}
export const LayoutCell: FC<LayoutCellProps> = ({
    style,
    children,
    leftNode,
    rightNode,
    leftProps,
    rightProps,
    childrenProps,
    center = false, //中间的子组件是否要完全水平居中
    ...args
}) => {
    const styles = StyleSheet.create({
        shell: { padding: 16 },
    });
    const shellRef = useRef({ leftW: 0, rightW: 0, subtraction: 0 });
    const [subtraction, setSubtraction] = useState(0);
    const measureLeft = ({
        nativeEvent: {
            layout: { x, y, width, height },
        },
    }) => {
        shellRef.current = {
            leftW: width,
            rightW: shellRef.current.rightW,
            subtraction: width - shellRef.current.rightW,
        };
        setSubtraction(width - shellRef.current.rightW);
    };
    const measureRight = ({
        nativeEvent: {
            layout: { x, y, width, height },
        },
    }) => {
        shellRef.current = {
            leftW: shellRef.current.leftW,
            rightW: width,
            subtraction: shellRef.current.leftW - width,
        };
        setSubtraction(shellRef.current.leftW - width);
    };

    return (
        <LayoutBase widthFull row style={[style]} {...args}>
            {leftNode ? (
                <LayoutBase heightFull {...leftProps} onLayout={center ? measureLeft : null}>
                    {leftNode}
                </LayoutBase>
            ) : null}
            {/* todo: 判断条件 */}
            {center && subtraction < 0 && <LayoutBase heightFull style={{ width: Math.abs(subtraction) }} />}
            <LayoutBase heightFull style={{ flex: 1 }} center={center} {...childrenProps}>
                {children}
            </LayoutBase>
            {center && subtraction > 0 && <LayoutBase heightFull style={{ width: subtraction }} />}
            {rightNode ? (
                <LayoutBase heightFull {...rightProps} onLayout={center ? measureRight : null}>
                    {rightNode}
                </LayoutBase>
            ) : null}
        </LayoutBase>
    );
};

LayoutCell.displayName = 'Layout.Cell';
