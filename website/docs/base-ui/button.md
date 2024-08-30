---
group:
    title: V2 开发中
toc: content
---

# Button

## 用法

### 类型

```jsx
import { Button } from '@quec/panel-base-ui';
import { View } from 'react-native';

export default () => (
    <View style={{ gap: 16 }}>
        <Button title={'solid(default)'} type={'solid'} />
        <Button title={'outline'} type={'outline'} />
        <Button
            title={'text'}
            type={'text'}
            fontProps={{ color: '#E63F32' }}
        />
    </View>
);
```

### 禁用

```jsx
import { Button } from '@quec/panel-base-ui';
import { View } from 'react-native';

export default () => (
    <View style={{ gap: 16 }}>
        <Button title={'solid'} type={'solid'} disabled />
        <Button
            title={'outline'}
            type={'outline'}
            disabled
        />
        <Button title={'text'} type={'text'} disabled />
    </View>
);
```

### 大小

```jsx
import { Button } from '@quec/panel-base-ui';
import { View } from 'react-native';

export default () => (
    <View style={{ gap: 16 }}>
        <Button title={'small'} size={'small'} />
        <Button title={'normal(default)'} size={'normal'} />
        <Button title={'large'} size={'large'} />
    </View>
);
```

### 圆角

```jsx
import { Button } from '@quec/panel-base-ui';
import { View } from 'react-native';

export default () => (
    <View style={{ gap: 16 }}>
        <Button
            title={'round full (default)'}
            round={'full'}
        />
        <Button title={'round middle'} round={'middle'} />
        <Button title={'round small'} round={'small'} />
        <Button title={'custom nummer 10'} round={10} />
    </View>
);
```

### 颜色

通过 color 属性配置

```jsx
import { Button } from '@quec/panel-base-ui';
import { View } from 'react-native';

export default () => (
    <View style={{ gap: 16 }}>
        <Button title={'default'} />
        <Button title={'yellow'} color={'#fed330'} />
        <Button
            title={'red'}
            type={'outline'}
            color={'#c0392b'}
        />
    </View>
);
```

## 属性

todo
