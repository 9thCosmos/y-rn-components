---
group:
    title: V1 待审查
toc: content
---

# CountDown

### 实线倒计时
```jsx
import { CountDown, Button } from '@quec/panel-base-ui';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { useState, useRef, useEffect } from 'react';

const style= {
    marginTop: 20,
};

export default () => {
    const [isRunning, setIsRunning] = useState(true);
    const countDownRef = useRef(null);
    return (
      <View style={{padding: 20}}>
        <CountDown restTime={30} isRunning={isRunning} ref={countDownRef}/>
        <CountDown restTime={30} format="ss" isRunning={isRunning} ref={countDownRef}/>
        <Button title='重置倒计时' onPress={()=>{countDownRef.current.reset()}} />
        <Button title='开始倒计时' style={style} onPress={()=>{setIsRunning(true);}} />
        <Button title='暂停倒计时' style={style} onPress={()=>{setIsRunning(false);}} />
      </View>
    )
};
```
### 虚线倒计时
```jsx
import { CountDown, Button } from '@quec/panel-base-ui';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { useState, useRef, useEffect } from 'react';

const style = {
    marginTop: 50,
};

export default () => {
    const [isRunning, setIsRunning] = useState(true);
    return (
      <View style={{padding: 20}}>
        <CountDown restTime={150} isRunning={isRunning} type={'dashed'} />
        <Button title='开始倒计时' onPress={()=>{setIsRunning(true);}} />
        <Button title='暂停倒计时' style={style} onPress={()=>{setIsRunning(false);}} />
      </View>
    )
};
```

### 属性
| 参数名称      | 描述                       | 类型                                     | 默认值             |
| :------------ | :------------------------- | :--------------------------------------- | :----------------- |
| isRunning     | 指定倒计时是否开始运行     | boolean                                  | true               |
| onChange      | 倒计时运行状态改变时的回调 | function(isRunning: boolean)             | -                  |
| restTime      | 倒计时时间（单位：秒）     | number                                   | 0                  |
| type          | 倒计时表盘类型             | 'dashed' \| 'solid'                      | 'solid'            |
| format        | 倒计时表盘时间显示格式     | 'hh:mm:ss' \| 'hh:mm' \| 'mm:ss' \| 'ss' | 'hh:mm:ss'         |
| progressColor | 表盘颜色                   | string                                   | theme.primaryColor |
| textColor     | 文字颜色                   | string                                   | theme.primaryColor |
