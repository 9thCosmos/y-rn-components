---
group: 
    title: V2 开发中
    order: 3
toc: content
title: Tab
---

# Tab <Badge type="warning">商榷中</Badge>

:::warning
组件仍在开发中，API 可能会发生变化。
:::

## 用法

### 基础用法
```jsx
import React, { useState, useEffect } from 'react';
import { Tab, Font } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    const [active_0, setActive_0] = useState(2);
    return (
        <View style={{ gap: 8, backgroundColor: '#F7F8FA', padding: 20, height: 600 }}>
            <Tab.Bar active={active_0} onChange={setActive_0} >
                <Tab.Item title={'Tab1'} icon='1' />
                <Tab.Item title={'Tab2'} icon='1' />
                <Tab.Item title={'Tab3'} icon='1' />
                <Tab.Item title={'Tab4'} icon='1' />
                <Tab.Item title={'Tab5'} icon='1' />
            </Tab.Bar>
        </View>
    );
};
```

### 样式风格
```jsx
import React, { useState, useEffect } from 'react';
import { Tab, Font } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    const [active_1, setActive_1] = useState(2);
    const [active_2, setActive_2] = useState(2);
    const [active_3, setActive_3] = useState(2);
    const [active_4, setActive_4] = useState(2);
    const [active_5, setActive_5] = useState(2);
    return (
        <View style={{ gap: 8, backgroundColor: '#F7F8FA', padding: 20, height: 600 }}>
            <Tab.Bar 
                active={active_1} 
                onChange={setActive_1} 
                type='capsule' 
                activeColor='#0052D9' 
            >
                <Tab.Item title={'Tab1'} />
                <Tab.Item title={'Tab2'} />
                <Tab.Item title={'Tab3'} />
            </Tab.Bar>
            <Tab.Bar active={active_2} onChange={setActive_2} type='capsule' >
                <Tab.Item title={'Tab1'} badge='dot' />
                <Tab.Item title={'Tab2'} />
                <Tab.Item title={'Tab3'} />
                <Tab.Item title={'Tab4'} />
                <Tab.Item title={'Tab5'} />
            </Tab.Bar>
            <Tab.Bar active={active_3} onChange={setActive_3} >
                <Tab.Item title={'Tab1'} />
                <Tab.Item title={'Tab2'} />
                <Tab.Item title={'Tab3'} badge='number' badgeNum={8} />
                <Tab.Item title={'Tab4'} />
            </Tab.Bar>
            <Tab.Bar active={active_4} onChange={setActive_4} checkedType='label' >
                <Tab.Item title={'Tab1'} />
                <Tab.Item title={'Tab2'} />
            </Tab.Bar>
            <Tab.Bar 
                active={active_5} 
                onChange={setActive_5} 
                checkedType='label' 
                withDivider={true}
                tabBarLayout='horizontal'
            >
                <Tab.Item title={'Tab1'} icon='1' />
                <Tab.Item title={'Tab2'} icon='1' />
                <Tab.Item title={'Tab3'} icon='1' />
            </Tab.Bar>
        </View>
    );
};
```

### 点击事件
```jsx
import React, { useState, useEffect } from 'react';
import { Tab, Font } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    const [active_0, setActive_0] = useState(2);
    return (
        <View style={{ gap: 8, backgroundColor: '#F7F8FA', padding: 20, height: 600 }}>
            <Tab.Bar active={active_0} onChange={setActive_0} >
                <Tab.Item title={'Tab1'} icon='1' />
                <Tab.Item title={'Tab2'} icon='1' />
                <Tab.Item title={'Tab3'} icon='1' />
                <Tab.Item title={'Tab4'} icon='1' />
            </Tab.Bar>
            <Text>active: {active_0 + 1}</Text>
        </View>
    );
};
```
