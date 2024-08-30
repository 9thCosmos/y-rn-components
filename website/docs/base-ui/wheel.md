---
group: 
    title: V2 开发中
    order: 3
toc: content
title: Wheel
---

# Wheel <Badge type="warning">商榷中</Badge>

:::warning
组件仍在开发中，API 可能会发生变化。
:::

## 用法

### 基础滚轮 Wheel
```jsx
import { Wheel,Font } from '@quec/panel-base-ui';
import { View } from 'react-native';
import React,{useState} from 'react';
const initData = Array.from({ length: 60 }).map((item, index) => {
    return { 
        id: index, 
        label: index < 10 ? '0' + index : index + '',
        value: index 
    };
});
export default () => {
    const [option, setOption] = useState(initData);
    const [value, setValue] = useState(10);
    return (
        <View style={{ gap: 8, backgroundColor: '#F7F8FA', padding: 20, height: 330 }}>
            <View style={{height:30}}><Font level={'m26'}>{'value: '+value}</Font></View>
            <Wheel 
                option={option} 
                selected={value}
                style={{ flex: 1 }}
                onValueChange={((i,v)=>{setValue(v.value)})}
             />
        </View>
    );
};
```

### 时间滚轮 DateTimePicker
```jsx
import { DateTimePicker,Font ,MomentType,Tab} from '@quec/panel-base-ui';
import { View } from 'react-native';
import React,{useState} from 'react';
import moment from 'moment';

export default () => {
    const timeType=MomentType.YYYY_MM_DD_HH_mm
    const [time, setTime] = useState(moment());
    return (
        <View style={{ gap: 8, backgroundColor: '#F7F8FA', padding: 20, height: 460 }}>
            <View style={{height:30,marginBottom:30}}>
                <Font level={'m26'}>
                    {'time: '+time.format(timeType)}
                </Font>
            </View>
            <DateTimePicker 
                style={{ flex: 1 }}
                selectTime={time}
                onValueChange={((v)=>{setTime(v)})}
             />
        </View>
    );
};
```

### 嵌套滚轮  WheelsGroup
```jsx
import React, { useState } from 'react';
import { WheelsGroup, Font } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';
let initData = Array.from({ length: 20 }).map((item, index) => {
    return { 
        id: index, 
        label: index < 10 ? '0' + index : index + '',
        value: index ,
    };
});
initData = initData.map(item=>{
    return{
        ...item,
        child:initData
    }
})
initData[0].child[0].child = Array.from({ length: 20 }).map((item, index) => {
    return { 
        id: index, 
        label: index < 10 ? '0' + index : index + '',
        value: index ,
    };
});
export default () => {
    const [value, setValue] = useState([{},{}]);
    return (
        <View style={{ gap: 8, backgroundColor: '#F7F8FA', padding: 20, height: 460 }}>
            <View style={{height:30,marginBottom:30}}>
                <Font level={'m26'}>
                    {'values: '+value.map(i=>i.value)}
                </Font>
            </View>
            <WheelsGroup 
                style={{ flex: 1 }}
                options={initData}
                onValueChange={((v)=>{
                    setValue(v)
                    })}
             />
        </View>
    );
};
```

## 属性

### 公共属性

| 属性名            | 描述                 | 类型      | 默认值 |
| :---------------- | :------------------- | :-------- | :----- |
| rowHeight         | 滚轮单项高度         | number    | 50     |
| rowNumber         | 展示行数             | number    | 5      |
| selectedFontSize  | 选定项的字体大小     | number    | 24     |
| opacityOffset     | 透明度偏移值         | number    | 0.2    |
| sizeOffset        | 字体大小偏移值       | number    | 4      |
| commonTextStyle   | 不被选中项的字体样式 | TextStyle | {}     |
| commonViewStyle   | 不被选中项的样式     | ViewStyle | {}     |
| selectedTextStyle | 被选中项的字体样式   | TextStyle | {}     |
| selectedViewStyle | 被选中项的样式       | ViewStyle | {}     |

```
type OptionType = {
    id: number;
    label: string;
    value: number;
    child: OptionType[] | undefined;
};
```

### 基础滚轮属性

| 属性名        | 描述               | 类型                                      | 默认值   |
| :------------ | :----------------- | :---------------------------------------- | :------- |
| option        | 滚轮中的展示数组   | OptionType[]                              | []       |
| selected      | 滚轮中的选定项下标 | number                                    | 0        |
| onValueChange | 滚动值的变化回调   | (index: number, item: OptionType) => void | ()=>void |


### 时间滚轮属性

| 属性名        | 描述             | 类型                    | 默认值                      |
| :------------ | :--------------- | :---------------------- | :-------------------------- |
| selectTime    | 选中时间         | Moment                  | moment()                    |
| startTime     | 开始时间         | Moment                  | moment()                    |
| endTime       | 结束时间         | Moment                  | 当前十年后                  |
| timeType      | 时间格式         | MomentType              | MomentType.YYYY_MM_DD_HH_mm |
| onValueChange | 滚动值的变化回调 | (value: Moment) => void | ()=>void                    |

#### 时间格式
```
export const MomentType = {
    YYYY: 'YYYY',
    YYYY_MM: 'YYYY-MM',
    YYYY_MM_DD: 'YYYY-MM-DD',
    YYYY_MM_DD_HH: 'YYYY-MM-DD HH',
    YYYY_MM_DD_HH_mm: 'YYYY-MM-DD HH:mm',
    YYYY_MM_DD_HH_mm_ss: 'YYYY-MM-DD HH:mm:ss',
    HH_mm: 'HH:mm',
    HH_mm_ss: 'HH:mm:ss',
};
```

### 嵌套滚轮属性

| 属性名           | 描述             | 类型                          | 默认值        |
| :--------------- | :--------------- | :---------------------------- | :------------ |
| selectedIndex    | 选中下标的数组   | number[]                      | number[]      |
| options          | 滚轮展示数组     | OptionType[]                  | [{}]          |
| visibleItemCount | 展示的滚轮数     | number                        | options的深度 |
| onValueChange    | 滚动值的变化回调 | (value: OptionType[]) => void | ()=>void      |
