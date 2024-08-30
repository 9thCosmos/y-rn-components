---
#group: 开发指南
group:
    title: V2 开发完成
toc: content
---

# 🎨 主题配置

## 颜色体系

通过固定规则，将品牌色/功能色等基色，转换为一系列的色板, 组件使用相应代号的颜色，而不是具体的色值，从而实现主题的切换

<code src="./components/ColorBoard.tsx" inline="true"></code>

## 安装&基本使用

自定义主题能力通过 Context/Provider 实现，需要单独安装 `@quec/panel-theme` 包

```shell
yarn add @quec/panel-theme --registry http://192.168.23.184:4873
```

```shell
npm install @quec/panel-theme --registry http://192.168.23.184:4873
```

在项目的入口文件中，使用 `QPThemeProvider` 包裹整个应用，并传入主题配置，组件库中的组件会自动使用主题配置

```jsx | pure
import { QPThemeProvider } from '@quec/panel-theme';

const myThemeConfig = {
    brandColor: '#0091ff',
    successColor: '#00cf63',
    warningColor: '#ff6600',
    errorColor: '#ff4219',
};

export default () => {
    return (
        <QPThemeProvider themeConfig={myThemeConfig}>
            <App />
        </QPThemeProvider>
    );
};
```

:::info
base-ui 中内置了默认主题，使用默认主题时，可以不使用 `QPThemeProvider` 包裹整个应用
:::

## 自定义主题配置

参考 `QPThemeConfig` 类型定义，自定义主题配置

```ts
export interface QPThemeConfig {
    // 主题类型
    type?: 'light' | 'dark';
    // 品牌色
    brandColor: string;
    // 成功色
    successColor: string;
    // 警告色
    warningColor: string;
    // 错误色
    errorColor: string;
}
```

## 获取主题色

`QPThemeProvider` 将会注入经过颜色体系计算的主题色，可以通过 `useContxt` 获取主题配置

```jsx
import {
    QPThemeContext,
    QPThemeProvider,
    QPLightThemeConfig,
} from '@quec/panel-theme';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';

const MyComonent = () => {
    const theme = useContext(QPThemeContext);
    const styleList = [
        {
            backgroundColor: theme.color.brand0,
            color: theme.color.gy8,
        },
        {
            backgroundColor: theme.color.brand1,
            color: theme.color.gy8,
        },
        {
            backgroundColor: theme.color.brand2,
            color: theme.color.gy1,
        },
        {
            backgroundColor: theme.color.brand3,
            color: theme.color.gy1,
        },
    ];
    return (
        <View>
            {styleList.map((style, index) => (
                <Text key={index} style={style}>
                    Hello World
                </Text>
            ))}
        </View>
    );
};

const myThemeConfigRed = Object.assign(
    {},
    QPLightThemeConfig,
    {
        brandColor: 'red',
    }
);

const myThemeConfigBlue = Object.assign(
    {},
    QPLightThemeConfig,
    {
        brandColor: 'indigo',
    }
);

export default () => {
    return (
        <>
            <QPThemeProvider themeConfig={myThemeConfigRed}>
                <MyComonent />
            </QPThemeProvider>
            <QPThemeProvider
                themeConfig={myThemeConfigBlue}
            >
                <MyComonent />
            </QPThemeProvider>
        </>
    );
};
```

<details>
<summary>【点击展开】主题色类型定义 <code>QPTheme</code> 与设计规范一致：</summary>

```ts
export type NeutralColorName =
    | 'gy1'
    | 'gy2'
    | 'gy3'
    | 'gy4'
    | 'gy5'
    | 'gy6'
    | 'gy7'
    | 'gy8'
    | 'gy9'
    | 'gy10'
    | 'gy11';
export type BrandColorName =
    | 'brand0'
    | 'brand1'
    | 'brand2'
    | 'brand3';
export type SuccessColorName =
    | 'success0'
    | 'success1'
    | 'success2'
    | 'success3';
export type WarningColorName =
    | 'warning0'
    | 'warning1'
    | 'warning2'
    | 'warning3';
export type ErrorColorName =
    | 'error0'
    | 'error1'
    | 'error2'
    | 'error3';

export type QPTheme = {
    color: Record<
        | NeutralColorName
        | BrandColorName
        | SuccessColorName
        | WarningColorName
        | ErrorColorName,
        string
    >;
};
```

</details>
