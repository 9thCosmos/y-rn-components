import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, isValidElement, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, View, ViewProps, ViewStyle } from 'react-native';
import { Font } from '../Font';
import { add, div, mul, subtract } from '../utils/number';

type DoubleTArr<T> = [T, T];

export interface SliderDoubleProps extends ViewProps {
    value: [number, number];
    disabled?: boolean;
    vertical?: boolean;
    min?: number;
    max?: number;
    step?: number;
    showStep?: boolean;
    onValueChange?: (value: DoubleTArr<number>) => void; //value变动的时候
    onSlidingStart?: (value: DoubleTArr<number>) => void; //滑动开始
    onSlidingComplete?: (value: DoubleTArr<number>) => void; //滑动结束
    style?: ViewStyle; //滑块最外层样式
    sliderStyle?: ViewStyle; //滑块容器样式
    trackStyle?: ViewStyle; //轨道样式
    stepStyle?: ViewStyle; //轨道刻度样式
    thumbStyle?: ViewStyle | DoubleTArr<ViewStyle>; //圆球样式
    thumbCustom?: ReactNode;
    disTrackStyle?: ViewStyle; //轨道样式
    disThumbStyle?: ViewStyle | DoubleTArr<ViewStyle>; //轨道样式
}

export const SliderDouble: FC<SliderDoubleProps> = ({
    value,
    disabled = false,
    vertical = false,
    max = 100,
    min = 0,
    step = 1,
    showStep = false,
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
    const trackPreviousRight = useRef(0); //滑轨右边与you外壳绝对距离
    const thumbPreviousRightValue = useRef(0); //右滑块上一次的值
    const trackPreviousLeft = useRef(0); //滑轨左边与左外壳绝对距离
    const thumbPreviousLeftValue = useRef(0); //左滑块上一次的值
    const trackControlLeft = useRef(false); //是否操纵左滑块
    // 滑轨位置 x-right，y-left
    const trackRight = useRef(new Animated.Value(0)).current;
    const trackLeft = useRef(new Animated.Value(0)).current;
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

    const computeArrProps = (prop) => {
        if (Array.isArray(prop)) {
            return prop;
        } else {
            return [prop, prop];
        }
    };

    const moveRight = (x, y) => {
        if (x <= 0) {
            if (-x <= trackLength.current - trackPreviousRight.current - trackPreviousLeft.current) {
                const stepNumber = Math.round((trackPreviousRight.current - x) / stepLength.current);
                animateSpring(trackRight, stepNumber * stepLength.current);
                onValueChange([thumbPreviousLeftValue.current, subtract(max, mul(stepNumber, step))]);
            } else {
                animateSpring(trackRight, trackLength.current - trackPreviousLeft.current);
                onValueChange([thumbPreviousLeftValue.current, thumbPreviousLeftValue.current]);
            }
        }
        if (x >= 0) {
            if (x <= trackPreviousRight.current) {
                const stepNumber = Math.round((trackPreviousRight.current - x) / stepLength.current);
                animateSpring(trackRight, stepNumber * stepLength.current);
                onValueChange([thumbPreviousLeftValue.current, subtract(max, mul(stepNumber, step))]);
            } else {
                animateSpring(trackRight, 0);
                onValueChange([
                    add(min, mul(valueAccount.current, div(trackPreviousLeft.current, trackLength.current))),
                    max,
                ]);
            }
        }
    };
    const moveLeft = (x, y) => {
        if (x <= 0) {
            if (-x <= trackPreviousLeft.current) {
                const stepNumber = Math.round((trackPreviousLeft.current + x) / stepLength.current);
                animateSpring(trackLeft, stepNumber * stepLength.current);
                onValueChange([add(min, mul(stepNumber, step)), thumbPreviousRightValue.current]);
            } else {
                animateSpring(trackLeft, 0);
                onValueChange([min, thumbPreviousRightValue.current]);
            }
        }
        if (x >= 0) {
            if (x <= trackLength.current - trackPreviousRight.current - trackPreviousLeft.current) {
                const stepNumber = Math.round((trackPreviousLeft.current + x) / stepLength.current);
                animateSpring(trackLeft, stepNumber * stepLength.current);
                onValueChange([add(min, mul(stepNumber, step)), thumbPreviousRightValue.current]);
            } else {
                animateSpring(trackLeft, trackLength.current - trackPreviousRight.current);
                onValueChange([thumbPreviousRightValue.current, thumbPreviousRightValue.current]);
            }
        }
    };

    const moveRightRelease = (x, y) => {
        if (x <= 0) {
            if (-x <= trackLength.current - trackPreviousRight.current - trackPreviousLeft.current) {
                const stepNumber = Math.round((trackPreviousRight.current - x) / stepLength.current);
                trackPreviousRight.current = stepNumber * stepLength.current;
                resetThumbPreviousRightValue();
                onSlidingComplete([thumbPreviousLeftValue.current, subtract(max, mul(stepNumber, step))]);
            } else {
                trackPreviousRight.current = trackLength.current - trackPreviousLeft.current;
                resetThumbPreviousRightValue();
                onSlidingComplete([thumbPreviousLeftValue.current, thumbPreviousLeftValue.current]);
            }
        }
        if (x >= 0) {
            if (x <= trackPreviousRight.current) {
                const stepNumber = Math.round((trackPreviousRight.current - x) / stepLength.current);
                trackPreviousRight.current = stepNumber * stepLength.current;
                resetThumbPreviousRightValue();
                onSlidingComplete([thumbPreviousLeftValue.current, subtract(max, mul(stepNumber, step))]);
            } else {
                trackPreviousRight.current = 0;
                resetThumbPreviousRightValue();
                onSlidingComplete([thumbPreviousLeftValue.current, max]);
            }
        }
    };
    const moveLeftRelease = (x, y) => {
        if (x <= 0) {
            if (-x <= trackPreviousLeft.current) {
                const stepNumber = Math.round((trackPreviousLeft.current + x) / stepLength.current);
                trackPreviousLeft.current = stepNumber * stepLength.current;
                resetThumbPreviousLeftValue();
                onSlidingComplete([add(min, mul(stepNumber, step)), thumbPreviousRightValue.current]);
            } else {
                trackPreviousLeft.current = 0;
                resetThumbPreviousLeftValue();
                onSlidingComplete([min, thumbPreviousRightValue.current]);
            }
        }
        if (x >= 0) {
            if (x <= trackLength.current - trackPreviousRight.current - trackPreviousLeft.current) {
                const stepNumber = Math.round((trackPreviousLeft.current + x) / stepLength.current);
                trackPreviousLeft.current = stepNumber * stepLength.current;
                resetThumbPreviousLeftValue();
                onSlidingComplete([add(min, mul(stepNumber, step)), thumbPreviousRightValue.current]);
            } else {
                trackPreviousLeft.current = trackLength.current - trackPreviousRight.current;
                resetThumbPreviousLeftValue();
                onSlidingComplete([thumbPreviousRightValue.current, thumbPreviousRightValue.current]);
            }
        }
    };
    // 重置左边的滑块到min的差值
    const resetThumbPreviousLeftValue = () => {
        thumbPreviousLeftValue.current = add(
            min,
            mul(valueAccount.current, div(trackPreviousLeft.current, trackLength.current))
        );
    };
    // 重置右边的滑块到max的差值
    const resetThumbPreviousRightValue = () => {
        thumbPreviousRightValue.current = subtract(
            max,
            mul(valueAccount.current, div(trackPreviousRight.current, trackLength.current))
        );
    };
    const _onPanResponderGrant = ({ nativeEvent: { locationX: lx, locationY } }, ges) => {
        if (disableRef.current) return;
        if (vertical) {
            // slider垂直取dy
        }
        const valuePosition = (trackLength.current - trackPreviousRight.current + trackPreviousLeft.current) / 2;
        if (lx > valuePosition) {
            // 操控右滑块
            const stepNumber = Math.round((trackLength.current - lx) / stepLength.current);
            animateSpring(trackRight, stepNumber * stepLength.current);
            trackControlLeft.current = false;
            trackPreviousRight.current = stepNumber * stepLength.current;
            onSlidingStart([thumbPreviousLeftValue.current, subtract(max, mul(stepNumber, step))]);
        } else {
            // 操控左滑块
            const stepNumber = Math.round(lx / stepLength.current);
            animateSpring(trackLeft, trackPreviousRight.current);
            trackControlLeft.current = true;
            trackPreviousLeft.current = stepNumber * stepLength.current;
            onSlidingStart([add(min, mul(stepNumber, step)), thumbPreviousRightValue.current]);
        }
    };

    const _onPanResponderMove = (evt, { dx, dy }) => {
        if (disableRef.current) return;
        if (trackControlLeft.current) {
            moveLeft(dx, 0);
        } else {
            moveRight(dx, 0);
        }
    };
    const _onPanResponderRelease = (evt, { dx, dy }) => {
        if (disableRef.current) return;
        if (trackControlLeft.current) {
            moveLeftRelease(dx, 0);
        } else {
            moveRightRelease(dx, 0);
        }
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
            layout: { width, height },
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
    const paintTrackLengthFromValueAndTrackLength = ([val0, val1]) => {
        animateSpring(trackRight, mul(trackLength.current, div(subtract(max, val1), valueAccount.current))); //调整滑轨中长度
        animateSpring(trackLeft, mul(trackLength.current, div(subtract(val0, min), valueAccount.current))); //调整滑轨中长度

        trackPreviousRight.current = mul(trackLength.current, div(subtract(max, val1), valueAccount.current));
        trackPreviousLeft.current = mul(trackLength.current, div(subtract(val0, min), valueAccount.current));
        resetThumbPreviousLeftValue();
        resetThumbPreviousRightValue();
    };
    useEffect(() => {
        paintTrackLengthFromValueAndTrackLength(value);
    }, [value]);
    useEffect(() => {
        if (max < min) {
            console.warn('min is larger than max');
        }
        if (value[0] > value[1]) {
            console.warn('value[0] is larger than value[1]');
        }
    }, [max, min, value]);
    useEffect(() => {
        disableRef.current = disabled;
    }, [disabled]);
    return (
        <View style={[{ flexDirection: 'row' }, style]}>
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
                    <View
                        onLayout={getTrackLength}
                        {...panResponderThumbRight.panHandlers}
                        style={[{ flex: 1, borderRadius: 44 }]}
                    >
                        <Animated.View
                            style={[
                                { right: trackRight, left: trackLeft },
                                {
                                    backgroundColor: disabled ? theme.disableColor : theme.primaryColor,
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 3,
                                    borderRadius: 0,
                                },
                                disabled ? disTrackStyle : trackStyle,
                            ]}
                        >
                            <View
                                style={{
                                    height: '100%',
                                    width: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 10,
                                }}
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
                                        disabled ? computeArrProps(disThumbStyle)[0] : computeArrProps(thumbStyle)[0],
                                    ]}
                                    pointerEvents={'none'}
                                >
                                    {isValidElement(thumbCustom) ? thumbCustom : null}
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    height: trackHeight,
                                    overflow: 'hidden',
                                    zIndex: 1,
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
                                style={{
                                    height: '100%',
                                    width: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 10,
                                }}
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
                                        disabled ? computeArrProps(disThumbStyle)[1] : computeArrProps(thumbStyle)[1],
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
        </View>
    );
};

SliderDouble.displayName = 'Slider.Double';
