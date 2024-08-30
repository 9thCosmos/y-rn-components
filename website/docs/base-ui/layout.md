---
group: V1 待审查
toc: content
---

# Layout

## 用法

见示例

```jsx
import React, { useState } from 'react';
import { Layout, Button } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    const [full, setFull] = useState(false);
    const [column, setColumn] = useState(false);
    const [row, setRow] = useState(false);
    const [center, setCenter] = useState(false);
    const [widthFull, setWidthFull] = useState(false);
    const [heightFull, setHeightFull] = useState(false);
    const [horiz, setHoriz] = useState('center');
    const [vert, setVert] = useState('center');
    const properties = {
        type: 'outline',
        style: {
            height: 30,
            paddingHorizontal: -26,
            marginHorizontal: 6,
            marginBottom:8,
        },
        size: 'small',
        round: 'small',
    };
    return (
        <View>
            <Layout widthFull column>
                <Layout widthFull row>
                    <Layout width-150 column>
                        <Button
                            onPress={() => {
                                setFull(!full);
                            }}
                            title={'full: '+full}
                            {...properties}
                        />
                        <Button
                            onPress={() => {
                                setCenter(!center);
                            }}
                            title={'center: '+center}
                            {...properties}
                        />
                        <Button
                            onPress={() => {
                                setColumn(!column);
                            }}
                            title={'column: '+column}
                            {...properties}
                        />
                        <Button
                            onPress={() => {
                                setRow(!row);
                            }}
                            title={'row: '+row}
                            {...properties}
                        />
                        <Button
                            onPress={() => {
                                setWidthFull(!widthFull);
                            }}
                            title={'widthFull: '+widthFull}
                            {...properties}
                        />
                        <Button
                            onPress={() => {
                                setHeightFull(!heightFull);
                            }}
                            title={'heightFull: '+heightFull}
                            {...properties}
                        />
                        <Button
                            onPress={() => {
                                if(horiz==='center'){
                                    setHoriz('right');   
                                }else if(horiz==='right'){
                                    setHoriz('left');   
                                }else {
                                    setHoriz('center');   
                                }
                            }}
                            title={'horiz: '+horiz}
                            {...properties}
                        />
                        <Button
                            onPress={() => {
                                if(vert==='center'){
                                    setVert('right');   
                                }else if(vert==='right'){
                                    setVert('left');   
                                }else {
                                    setVert('center');   
                                }
                            }}
                            title={'vert: '+vert}
                            {...properties}
                        />
                    </Layout>
                    <View style={{flex:1,borderWidth:5,borderColor:'black'}}>
                    <Layout 
                        full={full}
                        center={center}
                        column={column}
                        widthFull={widthFull}
                        heightFull={heightFull}
                        row={row}
                        horiz={horiz}
                        vert={vert}
                        style={{backgroundColor:'#1D75C8'}}
                    >
                    <Layout 
                        width-50
                        height-70
                        margin-10
                        style={{backgroundColor:'white'}}
                    />
                    <Layout 
                        width-40
                        height-30
                        margin-10
                        style={{backgroundColor:'white'}}
                    />
                    </Layout>
                    </View>

                </Layout>
            </Layout>
        </View>
    );
};
```

## 属性

| 参数名称                       | 描述                                                             | 类型                          | 默认值    |
| :----------------------------- | :--------------------------------------------------------------- | :---------------------------- | :-------- |
| horiz                          | { justifyContent: 'flex-start' \| 'center' \| 'flex-end' }       | 'left' \| 'center' \| 'right' | undefined |
| vert                           | { alignItems: 'flex-start' \| 'center' \| 'flex-end' }           | 'left' \| 'center' \| 'right' | undefined |
| full                           | { width: '100%', height: '100%' }                                | bool                          | false     |
| widthFull                      | { width: '100%' }                                                | bool                          | false     |
| heightFull                     | { height: '100%' }                                               | bool                          | false     |
| center                         | { justifyContent: 'center',alignItems: 'center'}                 | bool                          | false     |
| column                         | { flexDirection: 'row' \| 'column' } 冲突默认横排                | bool                          | false     |
| row                            | { flexDirection: 'row' \| 'column' } 冲突默认横排                | bool                          | false     |
| style                          | 样式                                                             | ViewStyle                     | {}        |
| keyof FlexStyle-FlexStyle[key] | 使用例子：\<View width-100 \/\> \=\>\<View style={{width:100}}\> |                               | false     |

<!-- ## Layout.Cell

### Layout.Cell 用法

见示例

```jsx
import React, { useState } from 'react';
import { Layout, Button } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

export default () => {
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: 500,
            }}
        >
            <Layout.Cell
                style={{ backgroundColor: '#1E1E1E' }}
                leftNode={
                    <Layout
                        heightFull
                        style={{
                            width: 80,
                            backgroundColor: '#1D75C8',
                        }}
                    />
                }
                // center
            >
                <View
                    style={{
                        backgroundColor: '#F2F2F2',
                        width: 100,****
                        height: 100,
                        padding: 20,
                        borderRadius: 100,
                    }}
                />
            </Layout.Cell>
        </View>
    );
};
```

### Layout.Cell属性

| 参数名称 | 描述         | 类型      | 默认值 |
| :------- | :----------- | :-------- | :----- |
| center   | 中间绝对居中 | bool      | false  |
| style    | 样式         | ViewStyle | {}     | --> |
