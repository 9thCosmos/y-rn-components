import React, { FC, ReactNode, useContext, useState } from 'react';
import {
    View,
    Text
} from 'react-native';

export interface ButtonProps {
    title: string;
}

export const Button: FC<ButtonProps> = ({title}) => {
    return (
        <View style={{width:100,height:100}}>
            <Text>{"测试"}</Text>
        </View>
    );
};
