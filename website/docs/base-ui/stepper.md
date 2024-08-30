---
group: V1 待审查
toc: content
---

# Stepper

## 用法

### 基本用法

```jsx
import { Stepper, Button } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';
import { useState } from 'react';

export default () => {
    const [value2, setValue2] = useState(9);
    return (
        <View
            style={{
                padding: 30,
            }}
        >
            <Button
                title={'50'}
                type={'solid'}
                onPress={() => {
                    setValue2(50);
                }}
            />
            <Button
                title={'-100'}
                type={'solid'}
                onPress={() => {
                    setValue2(-100);
                }}
            />
            <Stepper
                value={value2}
                changeValue={setValue2}
                valueType={'input'}
                step={10}
                maxValue={123}
                minValue={-10}
            />
        </View>
    );
};
```

### longPressSpeed 长按的增速

```jsx
import { Stepper, Button } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';
import { useState } from 'react';

export default () => {
    const [value, setValue] = useState(10);
    const [value1, setValue1] = useState(10);
    return (
        <View
            style={{
                padding: 30,
            }}
        >
            <Stepper
                value={value}
                changeValue={setValue}
                valueType={'input'}
                step={10}
                maxValue={123}
                minValue={-10}
                longPressSpeed={0}
            />
            <Stepper
                value={value1}
                changeValue={setValue1}
                valueType={'input'}
                step={10}
                maxValue={123}
                minValue={-10}
                longPressSpeed={1000}
            />
        </View>
    );
};
```

## 属性

| 参数名称       | 描述                                                     | 类型             | 默认值 |
| :------------- | :------------------------------------------------------- | :--------------- | :----- |
| value          | 值                                                       | number           | 0      |
| minValue       | 最小值                                                   | number           |        |
| maxValue       | 最大值                                                   | number           |        |
| longPressSpeed | 长按增加的速度，单位：ms<br>同时决定是否有长按增加的效果 | number           |        |
| disabled       | 是否可以移动                                             | boolean          | false  |
| step           | 步长                                                     | number           | 1      |
| unit           | 单位                                                     | string           | ''     |
| changeValue    | value 改变回调                                           | (value) => void  |        |
| style          | 壳样式                                                   | ViewStyle        |        |
| valueType      | 值可以点击编辑否                                         | 'text' , 'input' | 'text' |
| valueStyle     | 值 壳样式                                                | ViewStyle        |        |
| reduceStyle    | 减号 壳样式                                              | ViewStyle        |        |
| reduceColor    | icon 颜色值                                              | string           |        |
| addStyle       | 加号 壳样式                                              | ViewStyle        |        |
| addColor       | icon 颜色值                                              | string           |        |
