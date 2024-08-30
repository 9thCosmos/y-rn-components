import { Font, FontProps } from '@quec/panel-base-ui';
import React from 'react';
import { View } from 'react-native-web';

export default () => {
    const colorList: FontProps['color'][] = [
        'red',
        '#00ffcc',
        'rgb(11,122,127)',
        'brand1',
        'warning1',
        'error0',
        'success2',
        'gy1',
        'gy9',
    ];
    return (
        <View
            style={{
                flexDirection: 'column',
            }}
        >
            {colorList.map((color, index) => (
                <Font
                    level={'m14'}
                    key={index}
                    color={color}
                >
                    Hello World! color: {color}
                </Font>
            ))}
        </View>
    );
};
