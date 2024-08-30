import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, ReactNode, isValidElement, useContext, useEffect, useRef, useState } from 'react';
import {
    Animated,
    PanResponder,
    StyleSheet,
    TouchableHighlight,
    TouchableHighlightProps,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native';
import { Font } from '../Font';
import { add, div, mul, subtract } from '../utils/number';

export interface SliderProps extends ViewProps {
    value: number;
    disabled?: boolean;
    vertical?: boolean;
    min?: number;
    max?: number;
    step?: number;
    hasStepControl?: boolean;
    showStep?: boolean;
    onValueChange?: (value: number) => void; //value变动的时候
    onSlidingStart?: (value: number) => void; //滑动开始
    onSlidingComplete?: (value: number) => void; //滑动结束
    style?: ViewStyle; //滑块最外层样式
    sliderStyle?: ViewStyle; //滑块容器样式
    trackStyle?: ViewStyle; //轨道样式
    stepStyle?: ViewStyle; //轨道样式
    thumbStyle?: ViewStyle; //圆球样式
    thumbCustom?: ReactNode;
    disTrackStyle?: ViewStyle; //轨道样式
    disThumbStyle?: ViewStyle; //轨道样式
}

export const Slider: FC<SliderProps> = ({
    value,
    disabled = false,
    vertical = false,
    max = 100,
    min = 0,
    step = 1,
    showStep = false,
    hasStepControl = false,
    onValueChange,
    onSlidingStart,
    onSlidingComplete,
    sliderStyle,
    style,
    trackStyle,
    thumbStyle,
    disTrackStyle,
    disThumbStyle,
    thumbCustom,
    stepStyle,
}) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    const valueAccount = useRef(subtract(max, min));
    const stepLength = useRef(0);
    const trackLength = useRef(0);
    const disableRef = useRef(disabled);
    const [trackHeight, setTrackHeight] = useState(0);
    const [trackWidth, setTrackWidth] = useState(0);
    const [trackStepWidth, setTrackStepWidth] = useState(0);

    const stepNumberArray = useRef(
        Array.from({ length: Math.ceil((max - min) / step) + 1 }, (_, index) => add(min, mul(index, step)))
    );
    const stepArray = useRef(
        Array.from({ length: Math.ceil((max - min) / step) }, (_, index) => add(min, mul(index + 1, step)))
    );
    const trackPreviousRight = useRef(0);
    // 滑轨位置 x-right，y-left
    const trackPan = useRef(new Animated.Value(0)).current;

    // 滑动的动画
    const animateSpring = (pan, value) => {
        Animated.spring(pan, {
            toValue: value,
            friction: 7,
            tension: 100,
            useNativeDriver: false,
            overshootClamping: true,
        }).start();
    };

    const moveRight = (x, y) => {
        if (x <= 0) {
            if (-x <= trackLength.current - trackPreviousRight.current) {
                const stepNumber = Math.round((trackPreviousRight.current - x) / stepLength.current);
                animateSpring(trackPan, stepNumber * stepLength.current);
                onValueChange(subtract(max, mul(stepNumber, step)));
            } else {
                animateSpring(trackPan, trackLength.current);
                onValueChange(min);
            }
        }
        if (x >= 0) {
            if (x <= trackPreviousRight.current) {
                const stepNumber = Math.round((trackPreviousRight.current - x) / stepLength.current);
                animateSpring(trackPan, stepNumber * stepLength.current);
                onValueChange(subtract(max, mul(stepNumber, step)));
            } else {
                animateSpring(trackPan, 0);
                onValueChange(max);
            }
        }
    };

    const _onSlidingComplete = (x) => {
        if (x <= 0) {
            if (-x <= trackLength.current - trackPreviousRight.current) {
                const stepNumber = Math.round((trackPreviousRight.current - x) / stepLength.current);
                onSlidingComplete(subtract(max, mul(stepNumber, step)));
            } else {
                onSlidingComplete(min);
            }
        }
        if (x >= 0) {
            if (x <= trackPreviousRight.current) {
                const stepNumber = Math.round((trackPreviousRight.current - x) / stepLength.current);
                onSlidingComplete(subtract(max, mul(stepNumber, step)));
            } else {
                onSlidingComplete(max);
            }
        }
    };

    const _onPanResponderGrant = ({ nativeEvent: { locationX: lx, locationY } }, ges) => {
        if (disableRef.current) return;
        if (vertical) {
            // slider垂直取dy
        }
        const stepNumber = Math.round((trackLength.current - lx) / stepLength.current);
        animateSpring(trackPan, stepNumber * stepLength.current);
        onSlidingStart(subtract(max, mul(stepNumber, step)));
        trackPreviousRight.current = stepNumber * stepLength.current;
    };
    const _onPanResponderMove = (evt, { dx, dy }) => {
        if (disableRef.current) return;
        moveRight(dx, 0);
    };
    const _onPanResponderRelease = (evt, { dx, dy }) => {
        if (disableRef.current) return;
        _onSlidingComplete(dx);
    };
    const panResponderThumbRight = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: _onPanResponderGrant,
            onPanResponderMove: _onPanResponderMove,
            onPanResponderRelease: _onPanResponderRelease,
        })
    ).current;

    // 初始获取滑轨长度
    const getTrackLength = ({
        nativeEvent: {
            layout: { x, y, width, height },
        },
    }) => {
        trackLength.current = width; //滑轨长度
        setTrackHeight(height); //滑轨高度
        setTrackWidth(width); //滑轨长度
        setTrackStepWidth(width * (1 + 1 / (stepNumberArray.current.length - 1))); //滑轨刻度长度
        stepLength.current = div(mul(width, step), valueAccount.current); //步长
        paintTrackLengthFromValueAndTrackLength(value);
        // console.log('====== slider 轨道绝对长度为: ' + width);
        // console.log('====== slider 轨道绝对高度为: ' + height);
        // console.log('====== slider 步长的绝对长度为: ' + div(mul(width, step), valueAccount.current));
    };

    // 根据value和滑轨总长度计算出滑轨现长度
    const paintTrackLengthFromValueAndTrackLength = (val) => {
        if (max < min) {
            console.warn('min is larger than max');
        }
        animateSpring(trackPan, mul(trackLength.current, div(subtract(max, val), valueAccount.current))); //调整滑轨中长度
    };
    useEffect(() => {
        paintTrackLengthFromValueAndTrackLength(value);
    }, [value]);
    useEffect(() => {
        disableRef.current = disabled;
    }, [disabled]);
    return (
        <View style={[{ flexDirection: 'row' }, style]}>
            {hasStepControl && <Sub />}
            <View
                style={[
                    {
                        flex: 1,
                        height: 44,
                        backgroundColor: 'rgba(8, 15, 25, 0.1)',
                        flexDirection: 'row',
                        borderRadius: 50,
                        justifyContent: 'center',
                    },
                    sliderStyle,
                ]}
            >
                {showStep ? (
                    <View
                        style={[
                            {
                                position: 'absolute',
                                bottom: -20,
                                height: 20,
                                width: trackStepWidth,
                                flexDirection: 'row',
                            },
                        ]}
                    >
                        {stepNumberArray.current.map((item) => (
                            <View
                                key={item + ''}
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <Font>{item}</Font>
                            </View>
                        ))}
                    </View>
                ) : null}
                <View style={[{ flex: 1 }]}>
                    {showStep ? (
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                height: trackHeight,
                                width: trackWidth,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            {stepArray.current.map((item) => (
                                <View
                                    key={item}
                                    style={[
                                        {
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                        },
                                    ]}
                                >
                                    <View
                                        style={[
                                            {
                                                backgroundColor: theme.primaryColor,
                                                height: 5,
                                                width: 5,
                                                borderRadius: 5,
                                            },
                                            stepStyle,
                                        ]}
                                    />
                                </View>
                            ))}
                        </View>
                    ) : null}
                    <View onLayout={getTrackLength} {...panResponderThumbRight.panHandlers} style={[{ flex: 1 }]}>
                        <Animated.View
                            style={[
                                {
                                    right: trackPan,
                                    left: 0,
                                    backgroundColor: disabled ? theme.disableColor : theme.primaryColor,
                                },
                                {
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 3,
                                    borderRadius: 50,
                                },
                                disabled ? disTrackStyle : trackStyle,
                            ]}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    overflow: 'hidden',
                                    height: trackHeight,
                                }}
                                pointerEvents={'none'}
                            >
                                {showStep ? (
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            height: trackHeight,
                                            width: trackWidth,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                        pointerEvents={'none'}
                                    >
                                        {stepArray.current.map((item) => (
                                            <View
                                                key={item}
                                                style={[
                                                    {
                                                        flex: 1,
                                                        flexDirection: 'row',
                                                        justifyContent: 'flex-end',
                                                    },
                                                ]}
                                                pointerEvents={'none'}
                                            >
                                                <View
                                                    key={item}
                                                    style={[
                                                        {
                                                            backgroundColor: 'white',
                                                            height: 5,
                                                            width: 5,
                                                            borderRadius: 5,
                                                        },
                                                        stepStyle,
                                                    ]}
                                                    pointerEvents={'none'}
                                                />
                                            </View>
                                        ))}
                                    </View>
                                ) : null}
                            </View>
                            <View
                                style={{ height: '100%', width: 0, justifyContent: 'center', alignItems: 'center' }}
                                pointerEvents={'none'}
                            >
                                <View
                                    style={[
                                        {
                                            position: 'absolute',
                                            height: 38,
                                            width: 38,
                                            borderRadius: 38,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: 'white',
                                        },
                                        disabled ? disThumbStyle : thumbStyle,
                                    ]}
                                    pointerEvents={'none'}
                                >
                                    {isValidElement(thumbCustom) ? thumbCustom : null}
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                </View>
            </View>

            {hasStepControl && <Add />}
        </View>
    );
};

const addAndSubStyle = StyleSheet.create({
    base: {
        height: 44,
        width: 44,
        borderRadius: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#080F1906',
    },
    add: {
        marginLeft: 12,
    },
    sub: {
        marginRight: 12,
    },
});
const Add: FC<TouchableHighlightProps> = ({ onPress }) => {
    return (
        <TouchableHighlight style={[addAndSubStyle.base, addAndSubStyle.add]} onPress={onPress}>
            <></>
        </TouchableHighlight>
    );
};
const Sub: FC<TouchableHighlightProps> = ({ onPress }) => {
    return (
        <TouchableHighlight style={[addAndSubStyle.base, addAndSubStyle.sub]} onPress={onPress}>
            <></>
        </TouchableHighlight>
    );
};
