---
group: V1 待审查
toc: content
---

# ActionSheet

## 用法

见示例

```jsx
import React, { useState } from 'react';
import {
    ActionSheet,
    Layout,
    Button,
} from '@quec/panel-base-ui';
import { View } from 'react-native';

export default () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([
        { id: 1, title: 'title 1' },
        { id: 2, title: 'title 2', disable: true },
        {
            id: 3,
            title: 'title 3',
            description: 'description ...........',
        },
    ]);
    const properties = {
        type: 'outline',
        style: {
            height: 30,
            paddingHorizontal: -26,
            marginHorizontal: 6,
        },
        size: 'small',
        round: 'small',
    };
    return (
        <View>
            <Layout column widthFull>
                <Button
                    onPress={() => {
                        setVisible(true);
                    }}
                    title={' top '}
                    {...properties}
                />
            </Layout>
            <ActionSheet
                data={data}
                visible={visible}
            ></ActionSheet>
        </View>
    );
};
```

## ActionSheet = Overlay.Popup + Cell.button

## 属性

| 参数名称 | 描述          | 类型                             | 默认值 |
| :------- | :------------ | :------------------------------- | :----- |
| data     | Action 的列表 | {id:number,...CellButtonProps}[] | []     |

其他属性继承于 Overlay.Popup
