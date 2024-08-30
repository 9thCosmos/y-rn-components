import React, { FC, useEffect, useState } from 'react';
import { FlexStyle, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

type BoolType = 'true' | 'false';
type DirectionType = 'left' | 'right' | 'center';
type StyleBoolRecord<T> = Record<BoolType, T>;

const createStyles = (value): StyleBoolRecord<any> => {
    const style = {
        true: value[0] ?? {},
        false: value[1] ?? {},
    };
    return StyleSheet.create<Record<BoolType, any>>(style as StyleBoolRecord<any>);
};

type FlexStyleKeys = keyof FlexStyle;
export interface LayoutBaseProps extends ViewProps {
    //todo: 布局只管子元素排列，位置，不管父元素
    full?: boolean;
    widthFull?: boolean;
    heightFull?: boolean;
    //todo: 属性名称
    column?: boolean;
    row?: boolean;
    center?: boolean;
    horiz?: DirectionType;
    vert?: DirectionType;
}

type FlexStyleCombinations = {
    [Key in FlexStyleKeys]: `${Key}-${FlexStyle[Key]}`;
}[FlexStyleKeys];
export const LayoutBase: FC<
    LayoutBaseProps & {
        [key in FlexStyleCombinations]?: boolean;
        // [key in `${StyleAttrsNames}${string}`]: boolean;
    }
> = ({
    full = false,
    widthFull = false,
    heightFull = false,
    //二选一的属性
    column,
    row,
    center = false,
    horiz,
    vert,
    style,
    children,
    ...args
}) => {
    const columnStyles = createStyles([{ flexDirection: 'column' }, { flexDirection: 'row' }]);
    const centerStyles = createStyles([{ justifyContent: 'center', alignItems: 'center' }]);

    const fullStyles = createStyles([{ width: '100%', height: '100%' }]);
    const widthStyles = createStyles([{ width: '100%' }]);
    const heightStyles = createStyles([{ height: '100%' }]);

    const horizStyles = StyleSheet.create<Record<DirectionType, any>>({
        left: { justifyContent: 'flex-start' },
        center: { justifyContent: 'center' },
        right: { justifyContent: 'flex-end' },
    });
    const vertStyles = StyleSheet.create<Record<DirectionType, any>>({
        left: { alignItems: 'flex-start' },
        center: { alignItems: 'center' },
        right: { alignItems: 'flex-end' },
    });

    const [styleFormArgs, setStyleFormArgs] = useState<ViewStyle>({});
    const [isRow, setIsRow] = useState<boolean>(false);

    useEffect(() => {
        const argsStyleCopy: ViewStyle = {};
        Object.entries(args).forEach(([key, value]) => {
            const index = key.indexOf('-'); // 获取第一个 '-' 的位置
            const val = key.substring(index + 1); // 获取第一个 '-' 后的部分
            argsStyleCopy[key.substring(0, index)] = Number.isNaN(Number(val)) ? val : Number(val);
        });
        setStyleFormArgs(argsStyleCopy);
    }, []);

    useEffect(() => {
        setIsRow(row || !column || row === column || false);
    }, [column, row]);
    // console.log(paddingStyles[String(padding)]);

    //todo: 如果两个值都是true
    if (row === false && column === false)
        console.warn('Row and Column both are false, The program prioritizes the use of row');
    return (
        <View
            style={[
                fullStyles[String(full)],
                widthStyles[String(widthFull)],
                heightStyles[String(heightFull)],
                columnStyles[String(!isRow)],
                centerStyles[String(center)],
                horizStyles[horiz],
                vertStyles[vert],
                styleFormArgs,
                style,
            ]}
            {...args}
        >
            {children}
        </View>
    );
};

// LayoutBase.displayName = 'Layout.Base';
