import { View, ViewProps } from 'react-native';

import React, { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CollapseItem } from './CollapseItem';

type CollapseSize = 'small' | 'normal' | 'large';
type collapseChangeEventHandler = (isCollapse: boolean) => void;

export interface CollapseItemProps extends CollapseProps {
    key: number;
    title: string;
    description?: string;
    icon?: any;
    children: React.ReactNode;
    height: number;
    //控制CollapseItem重新渲染
    reRender: boolean;
}

export interface CollapseProps extends ViewProps {
    items: CollapseItemProps[];
    size?: CollapseSize;
    onChange?: collapseChangeEventHandler;
    isCollapseAll?: boolean;
}

export const Collapse: FC<CollapseProps> = forwardRef((props: CollapseProps, ref) => {
    const { isCollapseAll = false, onChange, items } = props;
    const collapseStatus = useRef(isCollapseAll);
    const [reRender, setReRender] = useState(false);
    useEffect(() => {
        onChange ? onChange(isCollapseAll) : null;
    }, [isCollapseAll]);
    const toggle = (status: boolean) => {
        if (status === undefined) {
            console.error('toggle函数需要一个boolean类型入参');
            return;
        }
        collapseStatus.current = status;
        setReRender(!reRender);
    };
    useImperativeHandle(ref, () => ({
        toggle,
    }));
    return (
        <View>
            {items.map((item) => {
                const { children, key, ...props } = item;
                return (
                    <CollapseItem {...props} key={key} isCollapseAll={collapseStatus.current} reRender={reRender}>
                        {children}
                    </CollapseItem>
                );
            })}
        </View>
    );
});

Collapse.displayName = 'Collapse';
