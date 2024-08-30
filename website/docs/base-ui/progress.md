---
group:
    title: V1 待审查
toc: content
---

# Progress

### 线形进度条

```jsx
import { Progress, Button } from '@quec/panel-base-ui';
import { View,Text } from 'react-native';
import { useState, useRef, useEffect } from 'react';

export default () => {
    const [percent, setPercent] = useState(0);
    const curPercent = useRef();
    const [status, setStatus] = useState('active');
    useEffect(()=>{
        curPercent.current = percent;
        if(percent === 100) setStatus('success');
    },[percent]);

    return (
      <View style={{padding: 20}}>
        <Progress percent={50} 
                  status={'active'} 
                  style={{heigh: '100', width: '100'}} 
                  showText={'50%'} 
        />
        <Progress percent={30} 
                  showInfo={false} 
                  status={'active'} 
        />
        <Progress percent={100} 
                  status={'fail'}
                  failColor={'#FF4219'}
                  showText={'100%'}
        />
        <Progress 
            percent={percent} 
            status={status} 
            successColor={'#20bf6b'}
            showText={`${Math.min(100, percent)}%`} 
        />
        <Button title={'增加进度'} size={'small'} 
                onPress={()=>{setPercent(curPercent.current+10)}} 
                style={{marginTop: 20}}
        />
      </View>
    )
};
```

### 环形进度条
```jsx
import { Progress, Button } from '@quec/panel-base-ui';
import { View,Text } from 'react-native';
import { useState, useRef, useEffect } from 'react';

export default () => {
    const [percent, setPercent] = useState(0);
    const [status, setStatus] = useState('active');
    const curPercent = useRef();
    useEffect(()=>{
        curPercent.current = percent;
        if(percent === 100) setStatus('success');
    },[percent]);

    return (
      <View style={{padding: 20}}>
        <Progress 
            percent={50} 
            status={'active'} 
            size={'large'} 
            progressType={'circle'} 
            showText={'50%'} 
        />
        <Progress 
            percent={percent} 
            status={status} 
            size={'normal'} 
            progressType={'circle'}
            successColor={'#20bf6b'}
            showText={`${Math.min(100, percent)}%`} 
        />
        <Button title={'增加进度'} size={'small'} 
            onPress={()=>{setPercent(curPercent.current+10)}} 
            style={{marginTop: 20}}
        />
      </View>
    )
};
```

### 属性
| 参数名称  | 描述 | 类型 | 默认值 |
| :-------- | :--------------------------------------------------------- | :---------------------------- | :----- |
| progressType | 进度条类型 | string | 'line' |
| showInfo |是否显示文字信息| boolean | true |
| activeColor | 运行态颜色 | string | theme.primaryColor |
| successColor | 成功态颜色 | string | theme.primaryColor |
| failColor | 失败态颜色 | string | theme.primaryColor |
| textColor | 文字颜色 | string | theme.primaryColor |
| status | 状态 | string | - |
| size | 尺寸 | string | 'normal' |
| percent | 进度 | number | 0 |
| showText | 文字内容 | string | - |
