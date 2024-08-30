import { Font, FontProps } from '@quec/panel-base-ui';
import React from 'react';
import { View } from 'react-native-web';

export default () => {
    const textList: {
        level: FontProps['level'];
        name: string;
    }[] = [
        { level: 'm28', name: '特殊标题' },
        { level: 'm24', name: '超大标题文字' },
        { level: 'm20', name: '大标题文字' },
        { level: 'm18', name: '中等标题文字' },
        { level: 'm16', name: '常规标题文字' },
        { level: 'm14', name: '小标题文字' },
        { level: 'r14', name: '正文文字' },
        { level: 'r12', name: '说明文字' },
        {
            level: 'r10',
            name: '徽标文字/弱提示文字 文档预览为12px，以实际为准',
        },
    ];
    return (
        <View
            style={{
                flexDirection: 'column',
            }}
        >
            {textList.map((item, index) => (
                <Font level={item.level} key={index}>
                    {item.name} Level: {item.level}
                </Font>
            ))}
        </View>
    );
};
