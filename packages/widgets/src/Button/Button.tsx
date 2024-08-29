import React, { FC } from 'react';
import {
    View,
    Text,
    TouchableOpacityProps,
    TouchableNativeFeedbackProps
} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps, TouchableNativeFeedbackProps{
    title: string;
}

export const Button: FC<ButtonProps> = ({title}) => {
    return (
        <View style={{width:100,height:100}}>
            <Text>{"测试"}</Text>
        </View>
    );
};
