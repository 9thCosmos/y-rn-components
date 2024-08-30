---
group: V2 开发中
toc: content
---

# Battery

## 用法

### 宽度、百分比、充电状态

通过 `width` 属性设置电量图标的宽度（默认 22，始终保持长宽比），`percent` 属性设置电量百分比，`charging` 属性表示是否正在充电（优先级高于`percent`）。 默认情况下，电量低于 20% 时，电量图标会变成主题配置的 `theme.dangerColor`，其他情况下为 `theme.successColor`。

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Battery } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    // 电量动画
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setPercent((percent) => {
                if (percent >= 100) {
                    return 0;
                }
                return percent + 1;
            });
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View style={{ height: 'calc(100vh - 32px)' }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                }}
            >
                <Battery />
                <Battery width={44} />
                <Battery width={66} percent={50} />
                <Battery width={88} percent={20} />
                <Battery
                    width={110}
                    percent={50}
                    charging
                />
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    flex: 1,
                    alignItems: 'center',
                    gap: 8,
                }}
            >
                <Battery width={160} percent={percent} />
                <Text>{percent}%</Text>
            </View>
        </View>
    );
};
```

### 自定义颜色

通过配置主题的 `theme.dangerColor` 和 `theme.successColor` 可以适配主题。也可以直接设置 `color` 属性来自定义颜色，`color`的优先级最高。

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Battery } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';
import {
    QuecThemeProvider,
    createThemeConfig,
    quecPanelDefaultTheme,
} from '@quec/panel-theme';

const myTheme = createThemeConfig({
    ...quecPanelDefaultTheme,
    dangerColor: 'orange',
    successColor: 'blue',
});

export default () => {
    // 电量动画
    const [percent, setPercent] = useState(0);
    const [color, setColor] = useState('#000');
    useEffect(() => {
        const interval = setInterval(() => {
            setPercent((percent) => {
                if (percent % 10 === 0) {
                    // 随机颜色
                    setColor(
                        (() => {
                            const color = Math.floor(
                                Math.random() * 16777215
                            ).toString(16);
                            return (
                                '#' +
                                new Array(
                                    6 - color.length + 1
                                ).join('0') +
                                color
                            );
                        })()
                    );
                }

                if (percent >= 100) {
                    return 0;
                }
                return percent + 1;
            });
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <QuecThemeProvider value={myTheme}>
            <View
                style={{
                    justifyContent: 'center',
                    height: 'calc(100vh - 32px)',
                    alignItems: 'center',
                    gap: 16,
                }}
            >
                <Battery
                    width={160}
                    color={color}
                    charging
                />
                <Battery
                    width={160}
                    color={color}
                    percent={percent}
                />
                <Battery width={160} percent={percent} />
                <Text>{percent}%</Text>
            </View>
        </QuecThemeProvider>
    );
};
```

## 属性

TODO

<API id="Battery"></API>
