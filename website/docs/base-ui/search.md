---
group: V1 待审查
toc: content
---

# Search

## 用法

见示例

```jsx
import React, { useState } from 'react';
import {
    Layout,
    Button,
    Search
} from '@quec/panel-base-ui';
import { View } from 'react-native';

export default () => {
    return (
        <View>
            <Search></Search>

        </View>
    );
};
```

## ActionSheet = Overlay.Popup + Cell.button

## 属性

| 参数名称 | 描述          | 类型                             | 默认值 |
| :------- | :------------ | :------------------------------- | :----- |
| isClear     | Action 的列表 | {id:number,...CellButtonProps}[] | true    |
| isClear     | Action 的列表 | {id:number,...CellButtonProps}[] | true    |

其他属性继承于 Overlay.Popup
