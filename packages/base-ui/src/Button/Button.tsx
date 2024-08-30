import React, { FC } from 'react';
import {
    Text,
    View
} from 'react-native';
export interface ButtonProps  {
    title: string ;
}

export const Button: FC<ButtonProps> = ({
    title,
}) => {
    

    return (
        <View style={{height:100,width:100,backgroundColor:"#00ff00"}}>
            <Text>{title}</Text>
        </View>
    );
};
