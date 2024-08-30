import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Divider } from '../Divider';
import { CollapseItemProps } from './Collapse';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CollapseItem: FC<CollapseItemProps> = (props: CollapseItemProps) => {
    const { children, title, height, isCollapseAll, description = '', reRender } = props;
    const [status, setStatus] = useState(isCollapseAll);
    const heightRef = useRef(new Animated.Value(isCollapseAll ? 0 : height)).current;
    const rotatetRef = useRef(new Animated.Value(isCollapseAll ? -90 : 0)).current;
    const switchStatus = () => {
        Animated.timing(heightRef, {
            toValue: status ? height : 0,
            useNativeDriver: false,
        }).start();
        Animated.timing(rotatetRef, {
            toValue: status ? 0 : -90,
            useNativeDriver: false,
        }).start();
        setStatus(!status);
    };
    useEffect(() => {
        isCollapseAll !== status ? switchStatus() : null;
    }, [isCollapseAll, reRender]);
    return (
        <View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: 58,
                    borderColor: 'red',
                    alignItems: 'center',
                    padding: 10,
                }}
            >
                <Text style={{ flex: 3, textAlign: 'left' }}>{title}</Text>
                <Text style={{ flex: 3, textAlign: 'right' }}>{description}</Text>
                <AnimatedPressable
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        transform: [
                            {
                                rotate: rotatetRef.interpolate({
                                    inputRange: [-90, 0],
                                    outputRange: ['-90deg', '0deg'],
                                }),
                            },
                        ],
                    }}
                    onPress={switchStatus}
                >
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <Path
                            d="M15 8.00005L10.5 12.5L6 8.00005"
                            stroke="#080F19"
                            strokeOpacity="0.4"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </AnimatedPressable>
            </View>
            <Divider color="#F7F8FA" />
            <Animated.View style={{ overflow: 'hidden', height: heightRef }}>
                <View style={{ padding: 10 }}>{children}</View>
                <Divider color="#F7F8FA" />
            </Animated.View>
        </View>
    );
};
