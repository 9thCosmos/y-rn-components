---
group: V1 待审查
toc: content
---

# Overlay

## 用法

见示例

```jsx
import React, { useState } from 'react';
import {
    Overlay,
    Button,
    Layout,
} from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
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
                <Layout center row widthFull>
                    <Button
                        onPress={() => {
                            setPosition('top');
                            setVisible(true);
                        }}
                        title={' top '}
                        {...properties}
                    />
                </Layout>
                <Layout center row widthFull>
                    <Button
                        onPress={() => {
                            setPosition('left');
                            setVisible(true);
                        }}
                        title={'left'}
                        {...properties}
                    />
                    <Button
                        onPress={() => {
                            setPosition('center');
                            setVisible(true);
                        }}
                        title={'center'}
                        {...properties}
                    />
                    <Button
                        onPress={() => {
                            setPosition('right');
                            setVisible(true);
                        }}
                        title={'right'}
                        {...properties}
                    />
                </Layout>
                <Layout center row widthFull>
                    <Button
                        onPress={() => {
                            setPosition('bottom');
                            setVisible(true);
                        }}
                        title={'bottom'}
                        {...properties}
                    />
                </Layout>
            </Layout>

            <Overlay
                visible={visible}
                position={position}
                horiz={'center'}
                vert={'center'}
                maskPressIn={() => {
                    setVisible(false);
                }}
            >
                <Layout
                    widthFull={
                        position === 'top' ||
                        position === 'bottom'
                    }
                    heightFull={
                        position === 'right' ||
                        position === 'left'
                    }
                    style={[
                        {
                            backgroundColor: '#fff',
                        },
                        position === 'center'
                            ? { width: 300, height: 300 }
                            : {},
                        position === 'right' ||
                        position === 'left'
                            ? { width: '50%' }
                            : {},
                        position === 'top' ||
                        position === 'bottom'
                            ? { height: '50%' }
                            : {},
                    ]}
                ></Layout>
            </Overlay>
        </View>
    );
};
```

## 属性

| 参数名称    | 描述           | 类型                                               | 默认值 |
| :---------- | :------------- | :------------------------------------------------- | :----- |
| visible     | 遮罩层显示     | bool                                               | false  |
| maskColor   | 遮罩层颜色     | string                                             |        |
| maskPressIn | 点击遮罩层回调 | ()=>{}                                             | false  |
| maskStyle   | 遮罩层样式     |                                                    | null   |
| position    | 位置           | 'center' \| 'top' \| 'bottom' \| 'left' \| 'right' | false  |

## Overlay.Dialog

```jsx
import React, { useState, useRef } from 'react';
import {
    Overlay,
    Button,
    Layout,
} from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
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
    const toastRef = useRef(null);
    return (
        <View>
            <Layout widthFull column>
                <Button
                    onPress={() => {
                        setVisible(true);
                    }}
                    title={'show Dialog common'}
                    {...properties}
                />
                <Button
                    onPress={() => {
                        setVisible1(true);
                    }}
                    title={'show Dialog no title'}
                    {...properties}
                />
            </Layout>
            <Overlay.Dialog
                maskPressIn={() => {
                    setVisible(false);
                }}
                visible={visible}
                title={'标题'}
                description={
                    '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
                }
            />
            <Overlay.Dialog
                maskPressIn={() => {
                    setVisible1(false);
                }}
                visible={visible1}
                description={
                    '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
                }
            />
        </View>
    );
};
```

### Overlay.Dialog 属性

| 参数名称    | 描述           | 类型                | 默认值    |
| :---------- | :------------- | :------------------ | :-------- |
| visible     | 弹出显示       | bool                | false     |
| title       | 对话框标题     | string \| ReactNode | undefined |
| description | 对话框描述文字 | string \| ReactNode | undefined |
| cancel      | 对话框取消方法 | () => void          | undefined |
| confirm     | 对话框确定方法 | () => void          | undefined |
| children    | 弹出展示的内容 | ReactNode           | undefined |

其他属性跟随 Overlay


## Overlay.Popup

```jsx
import React, { useState, useRef } from 'react';
import {
    Overlay,
    Button,
    Layout,
} from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
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
    const toastRef = useRef(null);
    return (
        <View>
            <Layout widthFull column>
                <Button
                    onPress={() => {
                        setVisible(true);
                    }}
                    title={'show Popup common'}
                    {...properties}
                />
                <Button
                    onPress={() => {
                        setVisible1(true);
                    }}
                    title={'show Popup no title'}
                    {...properties}
                />
            </Layout>
            <Overlay.Popup
                title={'标题'}
                maskPressIn={() => {
                    setVisible(false);
                }}
                visible={visible}
            />
            <Overlay.Popup
                maskPressIn={() => {
                    setVisible1(false);
                }}
                visible={visible1}
            />
        </View>
    );
};
```

### Overlay.Popup 属性

| 参数名称 | 描述           | 类型                | 默认值 |
| :------- | :------------- | :------------------ | :----- |
| visible  | 弹出显示       | bool                | false  |
| title    | 弹出展示的标题 | string \| ReactNode | 0      |
| children | 弹出展示的内容 | ReactNode           | 0      |

其他属性跟随 Overlay



## Overlay.Follow

```jsx
import React, { useState, useRef } from 'react';
import {
    Overlay,
    Button,
    Layout,
    Font,
} from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const properties = {
        type: 'outline',
        style: {
            height: 30,
            paddingHorizontal: -26,
            marginHorizontal: 0,
        },
        size: 'small',
        round: 'small',
    };
    const toastRef = useRef(null);
    return (
        <Layout column gap={50}>
            <Overlay.Follow
                visible={visible}
                maskPressIn={() => {
                    setVisible(false);
                }}
                position="bottom"
                content={
                    <Layout
                        center
                        style={{
                            backgroundColor: '#FFD767',
                            height: 150,
                            width: 150,
                        }}
                    >
                        <Font level="h1">{'bottom'}</Font>
                    </Layout>
                }
            >
                <Button
                    onPress={() => {
                        setVisible(true);
                    }}
                    title={'bottom'}
                    {...properties}
                />
            </Overlay.Follow>
            <Layout row gap={50}>
                <Overlay.Follow
                    visible={visible2}
                    maskPressIn={() => {
                        setVisible2(false);
                    }}
                    position="right"
                    content={
                        <Layout
                            center
                            style={{
                                backgroundColor: '#FFD767',
                                height: 150,
                                width: 150,
                            }}
                        >
                            <Font level="h1">
                                {'right'}
                            </Font>
                        </Layout>
                    }
                >
                    <Button
                        onPress={() => {
                            setVisible2(true);
                        }}
                        title={'right'}
                        {...properties}
                    />
                </Overlay.Follow>
                <Overlay.Follow
                    visible={visible3}
                    maskPressIn={() => {
                        setVisible3(false);
                    }}
                    position="left"
                    content={
                        <Layout
                            center
                            style={{
                                backgroundColor: '#FFD767',
                                height: 150,
                                width: 150,
                            }}
                        >
                            <Font level="h1">{'left'}</Font>
                        </Layout>
                    }
                >
                    <Button
                        onPress={() => {
                            setVisible3(true);
                        }}
                        title={'left'}
                        {...properties}
                    />
                </Overlay.Follow>
            </Layout>
            <Overlay.Follow
                visible={visible1}
                maskPressIn={() => {
                    setVisible1(false);
                }}
                position="top"
                content={
                    <Layout
                        center
                        style={{
                            backgroundColor: '#FFD767',
                            height: 150,
                            width: 150,
                        }}
                    >
                        <Font level="h1">{'top'}</Font>
                    </Layout>
                }
            >
                <Button
                    onPress={() => {
                        setVisible1(true);
                    }}
                    title={'top'}
                    {...properties}
                />
            </Overlay.Follow>
        </Layout>
    );
};
```

### Overlay.Follow 属性

| 参数名称 | 描述           | 类型                                   | 默认值 |
| :------- | :------------- | :------------------------------------- | :----- |
| visible  | 弹出显示       | bool                                   | false  |
| content  | 弹出展示的内容 | ReactNode                              | 0      |
| position | 位置           | 'top' \| 'bottom' \| 'left' \| 'right' | bottom |

其他属性跟随 Overlay
