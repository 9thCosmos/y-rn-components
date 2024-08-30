import React, { FC } from 'react';
import {
    View,
    Text,
    TouchableOpacityProps,
    TouchableNativeFeedbackProps
} from 'react-native';

import { RandomUtil } from '@lizhengyu617/y-utils';

export interface ButtonProps extends TouchableOpacityProps, TouchableNativeFeedbackProps{
    title: string;
}

export const Button: FC<ButtonProps> = ({title}) => {
    return (
        <View style={{width:100,height:100,backgroundColor:"#00ff00"}}>
            <Text>{"测试:"+RandomUtil.randomString(16)}</Text>
        </View>
    );
};
