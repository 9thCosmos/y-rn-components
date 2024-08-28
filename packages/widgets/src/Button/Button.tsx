import React, { FC, ReactNode, useContext, useState } from 'react';
import {
    StyleProp,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedbackProps,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps, TouchableNativeFeedbackProps {
    title: string;
}

// TODO 增加color属性，支持渐变
// 加载状态
// 按钮图标
export const Button: FC<ButtonProps> = ({title}) => {
    return (
        <View style={{width:100,height:100}}>
            <Text>{"测试"}</Text>
        </View>
    );
};
