---
group:
    title: V2 开发完成
    order: 3
toc: content
---

# Font

字体组件为 Text 组件的二次封装，包含常用的字体梯度，可以通过 level 属性设置字体梯度，通过 color 属性设置字体颜色。

:::info
当发现设计稿中的字体梯度不在规范中时，先找设计同学确认，如果是新增的字体梯度，需要在规范中添加。
如果是特殊需求，可以通过 style 属性自定义样式。
:::

## 梯度

<embed src="./demo-tip.md"></embed>

<code src="./usages/font/level.tsx"></code>

## 颜色

使用 color 属性替换颜色，支持配置主题色名称和 StyleSheet 支持的值

<code src="./usages/font/color.tsx"></code>

暗色适配：支持中...

## DIN 数字字体

针对数据展示类场景，封装了 DIN 字体的 SVG，使用 `din` 属性开启，开启后将会过滤掉字库之外的字符。
通过 `size` 来控制 DIN 字体的大小，默认为 48

<code src="./usages/font/din.tsx"></code>

## 自定义

当封装的字体梯度无法满足需求时，你可以吧 `Font` 组件当做 `Text` 组件使用，通过 `style` 属性自定义样式。

<code src="./usages/font/custom.tsx"></code>
