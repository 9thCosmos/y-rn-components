---
group:
    title: V1 待审查
    order: 4
toc: content
---

# Cell

## 用法

```jsx
import { Cell, Layout, Avatar } from '@quec/panel-base-ui';
import { View } from 'react-native';
import { useState } from 'react';

export default () => {
    const [value, setValue] = useState(false);

    return (<Layout column>
        <Cell
            title={'Cell'}
            onPress={() => {}}
            rightIcon="arrow"
        />
        <Cell
            onPress={() => {}}
            rightIcon="arrow"
            rightIconColor="red"
        />
        <Cell
            title={'Cell'}
            description={'disabled'}
            disabled 
            onPress={() => { }}
        />
        <Cell
            title={'Cell'}
            description={'disabled'}
            containStyle={{flexDirection:'column'}}
            value={'0 km'}
            onPress={() => { }}
            rightIcon="arrow"
        />
        <Cell
            title={'Cell'}
            description={'Cell description'}
            onPress={() => {}}
        />
        <Cell
            title={'Cell-Switch'} 
            description={'description'}
            onPress={() => {}}
            disabled
            rightIcon="switch"
            switchValue={value}
            switchOnValueChange={(v) => setValue(v)}
        />
        <Cell
            title={'Cell-button'}
            description={'description'}
            onPress={() => {
                console.log('-----------------------')
            }}
            disabled
            rightIcon="button"
            buttonTitle={'button'}
            buttonType={'solid'}
            buttonSize={'small'}
            buttonOnPress={() => setValue(false)}
            />
        <Cell
            title={'Cell'}
            description={'Cell description,Cell description,Cell description,Cell description,Cell description,Cell description,Cell description,Cell,'}
            onPress={() => {}}
            rightIcon={'arrow'}
            leftIcon={<Avatar
                style={{marginRight:8}}
                size={'small'}
                source={
                  'http://gitlab.quectel.com:8108/uploads/-/system/user/avatar/195/avatar.png'
                }
              />}
        />
    </Layout>)
};
```
### Cell 属性

| 参数名称             | 描述                           | 类型                                          | 默认值                                          |
| :------------------- | :----------------------------- | :-------------------------------------------- | :---------------------------------------------- |
| title                | 标题                           | string \| ReactNode                           | null                                            |
| titleFontProps       | 标题字体属性                   | FontProps                                     | { level: 'm16' }                                |
| description          | 描述                           | string \| ReactNode                           | null                                            |
| descriptionFontProps | 描述字体属性                   | FontProps                                     | { level: 'r14' }                                |
| value                | 值                             | string \| ReactNode                           | null                                            |
| valueFontProps       | 值字体属性                     | FontProps                                     | { level: 'm14' }                                |
| containStyle         | 标题和描述的外层样式           | ViewStyle                                     | {}                                              |
| leftIcon             | 左icon                         | 'switch' \| 'button'  \| 'arrow' \| ReactNode | undefined                                       |
| leftSideIconStyle    | 左icon的样式                   | ViewStyle                                     | {}                                              |
| rightIcon            | 右icon                         | 'switch' \| 'button'  \| 'arrow' \| ReactNode | undefined                                       |
| rightIconColor       | 右icon颜色（暂时只作用于箭头） | colorValue                                    | '#080F19'                                       |
| rightSideIconStyle   | 右icon样式                     | ViewStyle                                     | {}                                              |
| disabled             | 不可点击                       | boolean                                       | false ( rightIcon为'switch'或'button'时为true ) |

### PS：

**rightIcon 为 'switch' 时，可以增加的参数参考 switchProps ，所取的参数名为 'switch' 加上对应的属性名称（大写第一个字母），取小驼峰写法。**

**rightIcon 为 'button' 时，可以增加的参数参考 buttonProps ，所取的参数名为 'button' 加上对应的属性名称（大写第一个字母），取小驼峰写法。**


## Cell.Button

## 用法

```jsx
import { Cell, Layout } from '@quec/panel-base-ui';
import { View } from 'react-native';

export default () => (
    <Layout gap={6} column>
        <Cell.Button
            title={'Cell.Button'}
            onPress={() => {}}
        />
        <Cell.Button
            title={'Cell.Button disabled'}
            disabled
            onPress={() => {}}
        />
        <Cell.Button
            title={'Cell.Button'}
            description={'Cell.Button description'}
            onPress={() => {}}
        />
    </Layout>
);
```

### Cell.Button 属性

| 参数名称  | 描述         | 类型              | 默认值    |
| :-------- | :----------- | :---------------- | :-------- |
| title     | 按钮文字     | string\|ReactNode | undefined |
| fontColor | 按钮文字颜色 | string            | undefined |

其他更多属性继承于TouchableHighlight

## 属性

todo
