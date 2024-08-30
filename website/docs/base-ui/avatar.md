---
group: V2 开发中
toc: content
---

# Avatar

## 用法

通过 `size` 属性设置头像的大小，`source` 属性设置头像图片地址，`onPress` 属性设置头像点击事件。
size 属性支持数字和 small、default、large 三种字符串，分别对应 56、60、64 的大小。

```jsx
import React, { useState, useEffect } from 'react';
import { Avatar, Slider } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    const [value, setValue] = useState(60);
    return (
        <View style={{ gap: 16 }}>
            <Avatar
                size={'small'}
                onPress={() => console.log('press!')}
            />
            <Avatar />
            <Avatar size={'large'} />
            <Avatar
                size={'large'}
                source={
                    'http://gitlab.quectel.com:8108/uploads/-/system/user/avatar/195/avatar.png'
                }
            />
            <Text>设置头像大小</Text>
            <Slider
                onValueChange={(value) => {
                    setValue(value);
                }}
                value={value}
                maxValue={100}
                step={10}
                minValue={0}
                hasPoints={true}
            />
            <Avatar
                size={value}
                source={
                    'http://gitlab.quectel.com:8108/uploads/-/system/user/avatar/200/avatar.png'
                }
            />
        </View>
    );
};
```
