import React, { FC, useEffect } from 'react';
import { Animated, LayoutChangeEvent, Pressable, View, ViewProps } from 'react-native';

// TODO 解决FC泛型参数不生效的问题
export interface TabProps extends ViewProps {
    active: number;
    onChange?: (value: number) => void;
    children?: React.ReactNode;
    scrollable?: boolean;
    // ...
}

const ACTIVE_LINE_WIDTH = 18;

// TODO 主题色替换
export const TabBase: FC<TabProps> = ({ children, active, onChange, scrollable, ...props }) => {
    const tabItemLayoutInfo = React.useRef<Record<number, { x: number; width: number }>>({});
    const activeLinePosition = React.useRef(new Animated.Value(0));
    const activeLineOpacity = React.useRef(new Animated.Value(0));
    const onItemPress = (index: number) => {
        onChange?.(index);
    };

    const transformLine = (index) => {
        if (!tabItemLayoutInfo.current[index]) return;
        const { x, width } = tabItemLayoutInfo.current[index];
        Animated.timing(activeLinePosition.current, {
            toValue: x + (width - ACTIVE_LINE_WIDTH) / 2,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        Animated.timing(activeLineOpacity.current, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, []);

    useEffect(() => {
        transformLine(active);
    }, [active]);

    return (
        <View
            {...props}
            style={{
                height: 44,
                backgroundColor: '#fff',
                flexDirection: 'row',
            }}
        >
            {React.Children.map(children, (child, index) => {
                return (
                    <Pressable
                        style={{ height: 44, flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => onItemPress(index)}
                        onLayout={(event: LayoutChangeEvent) => {
                            const { x, width } = event.nativeEvent.layout;
                            tabItemLayoutInfo.current[index] = {
                                x,
                                width,
                            };
                            if (index === active) {
                                transformLine(index);
                            }
                        }}
                    >
                        {child}
                    </Pressable>
                );
            })}

            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    opacity: activeLineOpacity.current,
                    left: activeLinePosition.current,
                    backgroundColor: '#080F19',
                    height: 3,
                    width: ACTIVE_LINE_WIDTH,
                    borderRadius: 1.5,
                }}
            />
        </View>
    );
};

TabBase.displayName = 'Tab';
