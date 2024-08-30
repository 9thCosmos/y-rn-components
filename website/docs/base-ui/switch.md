---
group: V2 开发中
toc: content
---

# Switch

## 用法

### 基本用法

```jsx
import { Switch } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';
import { useState } from 'react';

export default () => {
    const [value, setValue] = useState(false);
    return (
        <View
            style={{
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
            }}
        >
            <Switch
                value={value}
                onValueChange={(v) => setValue(v)}
            />
            <Switch
                value={value}
                onValueChange={(v) => setValue(v)}
            />
            <Text>{value ? '开' : '关'}</Text>
        </View>
    );
};
```

### 尺寸&状态

通过 size 属性设置尺寸，通过 disabled 属性设置禁用状态。

```jsx
import { Switch } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    return (
        <View style={{ gap: 16 }}>
            <View
                style={{
                    gap: 16,
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Text>尺寸</Text>
                <Switch />
                <Text>small(default)</Text>
                <Switch size={'large'} />
                <Text>width:80,height:50</Text>
                <Switch size={{width:80,height:50}} />
                <Text>large</Text>
            </View>
            <View
                style={{
                    gap: 16,
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Text>禁用</Text>
                <Switch disabled />
                <Switch value={true} disabled />
            </View>
        </View>
    );
};
```

### 自定义颜色

通过配置主题，或者使用 color 属性，可以自定义 Switch 的颜色。

```jsx
import { Switch } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';
import { useState } from 'react';
import {
    createThemeConfig,
    quecPanelDefaultTheme,
    QuecThemeProvider,
} from '@quec/panel-theme';

const myTheme = createThemeConfig({
    ...quecPanelDefaultTheme,
    textColor: 'brown',
    primaryColor: 'orange',
    warningColor: 'purple',
    successColor: 'pink',
    dangerColor: 'darkred',
});

export default () => {
    const [value, setValue] = useState(false);
    return (
        <View style={{ gap: 16 }}>
            <Text>设置Color</Text>
            <View
                style={{
                    gap: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <Switch color={'#f00'} value={value}  onValueChange={setValue} closedColor="blue" />
                <Switch color={'yellow'} value={true} />
                <Switch
                    color={'rgb(12,34,56)'}
                    value={true}
                />
                <Switch color={'primary'} value={true} />
                <Switch color={'warning'} value={true} />
                <Switch color={'danger'} value={true} />
                <Switch color={'success'} value={true} />
                <Switch
                    value={value}
                    onValueChange={(v) => setValue(v)}
                    color="red"
                    closedColor="green"
                    centerColor="yellow"
                />
            </View>
            <Text>主题配置</Text>
            <QuecThemeProvider value={myTheme}>
                <View
                    style={{
                        gap: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <Switch
                        color={'primary'}
                        value={true}
                    />
                    <Switch
                        color={'warning'}
                        value={true}
                    />
                    <Switch color={'danger'} value={true} />
                    <Switch
                        color={'success'}
                        value={true}
                    />
                </View>
            </QuecThemeProvider>
        </View>
    );
};
```

## 属性

| 属性名        | 描述               | 类型                                             | 默认值   |
| :------------ | :----------------- | :----------------------------------------------- | :------- |
| size          | 尺寸               | 'small' \| 'large' \| {height:number,width:number} | 'small'  |
| disabled      | 不可用             | boolean                                          | false    |
| value         | 开关值             | boolean (required)                               | --       |
| color         | 开关打开时背景颜色 | string                                           | 主题色   |
| closedColor   | 开关关闭时背景颜色 | string                                           | 主题色   |
| centerColor   | 开关内按钮处背景色 | string                                           | 'white'  |
| centerChild   | 开关内按钮内子元素 | ReactElement                                     | null     |
| style         | 外层点击区域的样式 | ViewStyle                                        | { }      |
| onValueChange | 点击回调           | (value)=>void                                    | ()=>void |

<API id="Switch"></API>
