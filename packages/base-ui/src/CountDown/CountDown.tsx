import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Progress } from '../Progress';
import { formatTime } from './utils';

export type countDownChangeEventHandler = (isRunning: boolean) => void;
type CountDownType = 'dashed' | 'solid';
export type FormatType = 'hh:mm:ss' | 'hh:mm' | 'mm:ss' | 'ss';
export interface CountDownProps extends ViewProps {
    isRunning?: boolean;
    onChange?: countDownChangeEventHandler;
    restTime: number; //倒计时的时间，单位：秒
    type?: CountDownType; //倒计时类型，实线进度条 / 虚线进度条
    progressColor?: string;
    textColor?: string;
    style?: StyleProp<ViewStyle>;
    format?: FormatType;
}

export const CountDown = forwardRef((props: CountDownProps, ref: any) => {
    const {
        style,
        progressColor,
        restTime = 0,
        isRunning = true,
        type = 'solid',
        textColor,
        onChange,
        format = 'hh:mm:ss',
    } = props;
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);
    const [time, setTime] = useState(restTime);
    const timeCur = useRef(restTime);
    useImperativeHandle(ref, () => ({
        reset: () => {
            reset();
        },
    }));
    const start = () => {
        if (time === 0) {
            return;
        } else if (isRunning !== false) {
            timer.current = setInterval(() => {
                timeCur.current--;
                setTime(timeCur.current);
            }, 1000);
        }
    };
    const stop = () => {
        if (timer.current != null) {
            clearInterval(timer.current);
            timer.current = null;
        }
    };
    const reset = () => {
        if (timer.current != null) {
            clearInterval(timer.current);
            timer.current = null;
        }
        timeCur.current = restTime;
        setTime(timeCur.current);
        timer.current = setInterval(() => {
            timeCur.current--;
            setTime(timeCur.current);
        }, 1000);
    };
    useEffect(() => {
        isRunning ? start() : stop();
        onChange ? onChange(isRunning) : null;
    }, [isRunning]);

    useEffect(() => {
        if (time === 0) {
            stop();
        }
    }, [time]);

    return (
        <View style={style}>
            <Progress
                percent={(time / restTime) * 100}
                showText={formatTime(time, format)}
                progressType={type === 'dashed' ? 'circle_dashed' : 'circle'}
                activeColor={progressColor}
                textColor={textColor}
                status={'active'}
            />
        </View>
    );
});
