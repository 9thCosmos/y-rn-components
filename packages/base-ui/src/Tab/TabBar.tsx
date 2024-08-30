import React from 'react';
import { Animated, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import { Divider } from '../Divider';

type checkedType = 'normal' | 'label';
type tabBarType = 'filled' | 'capsule';
const TAB_BAR_HEIGHT = 48;
const TAB_BAR_RADIUS = TAB_BAR_HEIGHT / 2;
type layoutType = 'horizontal' | 'vertical';

export interface TabBarProps extends ViewProps {
    active: number;
    onChange?: (value: number) => void;
    children?: React.ReactNode;
    type?: tabBarType;
    checkedType?: checkedType;
    withDivider?: boolean;
    activeColor?: string;
    tabBarLayout?: layoutType;
    // ...
}

// TODO 主题色替换
export const TabBar: React.FC<TabBarProps> = (props: TabBarProps) => {
    const {
        children,
        active,
        type = 'filled',
        onChange,
        checkedType = 'normal',
        withDivider,
        activeColor,
        tabBarLayout,
        ...restProps
    } = props;
    const itemNumber = React.Children.count(children);
    const activeLeftFlex = React.useRef(new Animated.Value(active)).current;

    const styles = StyleSheet.create({
        //tabBar默认样式
        barFilled: {
            height: TAB_BAR_HEIGHT,
            borderRadius: 0,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        //tabBar胶囊样式
        barCapsule: {
            height: TAB_BAR_HEIGHT,
            borderRadius: TAB_BAR_RADIUS,
            backgroundColor: '#fff',
            flexDirection: 'row',
            shadowColor: '#000000',
            shadowOffset: { width: 8, height: 8 },
            shadowRadius: 10,
            shadowOpacity: 0.08,
        },
        //高亮区域外层样式
        highlightOuter: {
            position: 'absolute',
            paddingHorizontal: 3,
            paddingVertical: 5,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            flexDirection: 'row',
        },
        //高亮区域内层样式
        highlightInner: {
            width: `${(1 / itemNumber) * 100}%`,
            borderRadius: TAB_BAR_RADIUS,
            backgroundColor: '#F2F3FF',
            height: '100%',
        },
    });

    const onItemPress = (index: number) => {
        onChange?.(index);
    };

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(activeLeftFlex, {
                toValue: active,
                duration: 200,
                useNativeDriver: false,
            }),
        ]).start();
    }, [active]);

    return (
        <View style={type === 'filled' ? styles.barFilled : styles.barCapsule} {...restProps}>
            {checkedType === 'normal' ? (
                <View style={styles.highlightOuter}>
                    <Animated.View
                        style={[
                            styles.highlightInner,
                            {
                                marginLeft: activeLeftFlex.interpolate({
                                    inputRange: [0, itemNumber - 1],
                                    outputRange: ['0%', `${((itemNumber - 1) / itemNumber) * 100}%`],
                                }),
                            },
                        ]}
                    />
                </View>
            ) : null}
            {React.Children.map(children, (child, index) => {
                return (
                    <>
                        <Pressable
                            style={{ height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => onItemPress(index)}
                        >
                            {React.cloneElement(child as React.ReactElement, {
                                isActive: index === active,
                                activeColor: activeColor,
                                tabBarLayout: tabBarLayout,
                            })}
                        </Pressable>
                        {withDivider && index < itemNumber - 1 ? (
                            <Divider style={{ height: '80%' }} vertical={true} color="#E7E7E7" />
                        ) : null}
                    </>
                );
            })}
        </View>
    );
};
