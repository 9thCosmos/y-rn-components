---
group: V1 待审查
toc: content
---

# Divider

## 用法

见示例

```jsx
import React, { useState } from 'react';
import {
    Divider,
    Button,
    Layout,
    Font
} from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    const propertiesX = {
        type: 'solid',
        style: {
            width: 60,
            height: 60,
            paddingHorizontal: -26,
            flex: 1,
            margin: 6,
        },
        size: 'large',
        round: 'small',
        title: 'X',
    };
    const propertiesO = {
        type: 'outline',
        style: {
            width: 60,
            height: 60,
            paddingHorizontal: -26,
            margin: 6,
            flex: 1,
        },
        size: 'large',
        round: 'small',
        title: 'O',
    };
    return (
        <View>
            <Divider
                weight={2}
                subText={'分割线'}
                color={'#1D75C8'}
                textColor={'#308FF3'}
            />
            <Layout row justifyContent-space-between marginVertical-20>
                <Font>竖着的分割线</Font>            
                <Divider
                    weight={0.1}
                    vertical
                    color={'#1D75C8'}
                />
                <Font>竖着的分割线</Font> 
                <Divider
                    weight={0.5}
                    vertical
                    color={'#1D75C8'}
                />
                <Font>竖着的分割线</Font> 
            </Layout>

            <Divider
                weight={2}
                color={'red'}
            />
        </View>
    );
};
```

## 属性

| 参数名称  | 描述                   | 类型                | 默认值 |
| :-------- | :--------------------- | :------------------ | :----- |
| color     | 分割线颜色             | string              |        |
| vertical  | 分割线垂直             | boolean             | false  |
| weight    | 分割线宽度             | number              | 0.5    |
| subText   | 分割线内部提示文字     | string \| ReactNode | false  |
| textColor | 分割线内部提示文字颜色 | string              | false  |
