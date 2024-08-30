---
group:
    title: V1 待审查
toc: content
---

# Collapse
### 用法

```jsx
import { Collapse, Button } from '@quec/panel-base-ui';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { useState, useRef, useEffect } from 'react';

const items = [
  {
      key: 0,
      title: '标题0',
      description: '描述内容0',
      children: <Text>111</Text>,
      height: 60,
  },
  {
      key: 1,
      title: '标题1',
      description: '描述内容1',
      children: <Text>222</Text>,
      height: 58,
   },
  {
      key: 2,
      title: '标题2',
      description: '描述内容2',
      children: <Text>333</Text>,
      height: 58,
  },
];

export default () => {
  const [isCollapse, setIsCollapse] = useState(false);
    const colRef = useRef(null);
    return (
      <View style={{padding: 20, backgroundColor: '#F7F8FA', height: 600}}>
        <View style={{padding: 20, backgroundColor: '#FFFFFF', borderRadius: 25}}>
          <Collapse ref={colRef} items={items} isCollapseAll={isCollapse}  />
        </View>
        <Button 
          title='全部折叠' 
          onPress={()=>{colRef.current.toggle(true)}} 
          style={{marginTop: 20}}
        />
        <Button 
          title='全部展开' 
          onPress={()=>{colRef.current.toggle(false)}} 
          style={{marginTop: 20}}
        />
      </View>
    )
};
```

### CollapseItem 属性（CollapseItem以数组形式声明）
| 参数名称    | 描述                     | 类型      | 默认值 |
| :---------- | :----------------------- | :-------- | :----- |
| key         | 唯一标识符，默认为索引值 | number    | index  |
| title       | 标题内容                 | string    | -      |
| description | 标题栏右侧描述内容       | string    | -      |
| icon        | 折叠/展开图标            | string    | -      |
| children    | 内容                     | ReactNode | -      |
| height      | 内容栏高度               | number    | 0      |

### Collapse 属性
| 参数名称      | 描述                      | 类型                | 默认值 |
| :------------ | :------------------------ | :------------------ | :----- |
| items         | CollapseItem数组          | CollapseItemProps[] | []     |
| onChange      | 整体折叠/展开状态改变回调 | function            | -      |
| isCollapseAll | 初始面板折叠/展开状态     | boolean             | false  |

### Collapse 方法
通过ref绑定Collapse组件，通过方法toggle(status: boolean)实现全部折叠/展开功能。
