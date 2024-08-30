import React, { FC, forwardRef, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Circle as SvgCircle, Text, TSpan } from 'react-native-svg';
import { ProgressProps } from './Progress';

export interface CircleProps extends ProgressProps {
    statusColorMap?: Record<ProgressProps['status'], string>;
    _percent: number;
}

//封装动画组件
// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
const _SvgCircle = forwardRef(({ collapsable, ...Props }: any, ref: any) => <SvgCircle {...Props} ref={ref} />);
_SvgCircle.displayName = '_SvgCircle';
const AnimatedCircle = Animated.createAnimatedComponent(_SvgCircle);

const sizeMap: Record<ProgressProps['size'], number> = {
    small: 50,
    normal: 64,
    large: 80,
};

export const Circle: FC<CircleProps> = (props: CircleProps) => {
    const {
        size = 'normal',
        _percent,
        statusColorMap,
        status,
        showInfo = true,
        style,
        progressType = 'circle',
        showText,
        textColor,
    } = props;
    //环形设置相关参数
    //圆环周长，用于设置strokeDashoffset
    const progressLength = Math.floor(sizeMap[size] * 2 * 3.14);
    //Svg尺寸
    const SVG_WIDTH_HEIGHT = sizeMap[size] * 2 + 20;
    //圆心坐标
    const CX_CY = sizeMap[size] + 10;
    //半径
    const RADIUS = sizeMap[size];
    const currentPercent = useRef(new Animated.Value((1 - _percent / 100) * progressLength)).current;
    useEffect(() => {
        const cur = (1 - _percent / 100) * progressLength;
        Animated.timing(currentPercent, {
            toValue: cur,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [_percent]);
    const styles = StyleSheet.create({
        fontStyle: {
            fontSize: 14,
            fontWeight: '700',
            fontStyle: 'normal',
            color: statusColorMap[status],
            fontFamily: 'DIN Alternate',
        },
    });
    return (
        <View style={style}>
            <Svg height={SVG_WIDTH_HEIGHT} width={SVG_WIDTH_HEIGHT} fill="#F5F5F5">
                <SvgCircle cx={CX_CY} cy={CX_CY} r={RADIUS} stroke="#eee" strokeWidth={7} />
                <AnimatedCircle
                    cx={CX_CY}
                    cy={CX_CY}
                    r={RADIUS}
                    fill="none"
                    transform={`rotate(-90 ${CX_CY} ${CX_CY})`}
                    stroke={statusColorMap[status]}
                    strokeWidth={8}
                    strokeLinecap={progressType === 'circle' ? 'round' : 'square'}
                    strokeDasharray={progressLength}
                    strokeDashoffset={currentPercent}
                />
                {progressType === 'circle_dashed' ? (
                    <SvgCircle
                        cx={CX_CY}
                        cy={CX_CY}
                        r={RADIUS}
                        fill="none"
                        stroke="#eee"
                        strokeWidth={9}
                        strokeLinecap="square"
                        strokeDasharray={'2, 11'}
                        strokeDashoffset={0}
                    />
                ) : null}
                {showInfo ? (
                    <Text
                        x={CX_CY}
                        y={CX_CY}
                        fill={textColor || statusColorMap[status]}
                        textAnchor="middle"
                        fontSize={20}
                        fontWeight="700"
                        fontStyle="normal"
                        fontFamily="DIN Alternate"
                    >
                        <TSpan>{showText}</TSpan>
                    </Text>
                ) : null}
            </Svg>
        </View>
    );
};
