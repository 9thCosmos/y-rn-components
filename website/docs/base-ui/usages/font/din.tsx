import { Font } from '@quec/panel-base-ui';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native-web';

export default () => {
    const [num, setNum] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setNum((num) => {
                if (num >= 150) {
                    return 0;
                }
                return num + 1;
            });
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <View>
            <Font din>1234567890</Font>
            <Font din>.%:-℃°C</Font>
            <Font din>1a2b3哈哈4567890</Font>
            <Font din color="red">
                1234567890
            </Font>
            <Font din color="error1">
                .%:-℃°C
            </Font>
            <Font din size={60}>
                1234567890
            </Font>
            <Font din size={80}>
                .%:-℃°C
            </Font>
            <Font din size={100} color={'brand1'}>
                {(num / 10).toFixed(1).toString()}%
            </Font>
            {/*通过嵌套实现一些特殊场景*/}
            <Font din size={100} color={'brand1'}>
                {(num / 10).toFixed(1).toString()}
                <Font size={50}>%</Font>
            </Font>
        </View>
    );
};
