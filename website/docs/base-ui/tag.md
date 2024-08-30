---
group: V2 开发中
toc: content
---

# Tag

## 用法

见示例

```jsx
import React, { useState, useEffect } from 'react';
import { Tag, Font } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';

const Row = ({ children }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                flexWrap: 'wrap',
            }}
        >
            {children}
        </View>
    );
};

export default () => {
    return (
        <View style={{ gap: 16 }}>
            <Row>
                <Font level={'desc'}>
                    通过 size 设置尺寸
                </Font>
                <Tag title={'标签'} size={'small'} />
                <Tag title={'标签'} />
                <Tag title={'标签'} size={'large'} />
            </Row>
            <Row>
                <Font level={'desc'}>
                    通过 color 设置颜色
                </Font>
                <Tag title={'primary'} />
                <Tag title={'success'} color={'success'} />
                <Tag title={'warning'} color={'warning'} />
                <Tag title={'danger'} color={'danger'} />
            </Row>
            <Row>
                <Font level={'desc'}>
                    通过 type 设置风格
                </Font>
                <Tag title={'default'} />
                <Tag title={'outlined'} type={'outlined'} />
                <Tag title={'dashed'} type={'dashed'} />
                <Tag title={'ghost'} type={'ghost'} />
            </Row>
            <Font level={'h2'}>效果一览</Font>
            <Row>
                <Tag title={'default'} />
                <Tag title={'outlined'} type={'outlined'} />
                <Tag title={'dashed'} type={'dashed'} />
                <Tag title={'ghost'} type={'ghost'} />
            </Row>
            <Row>
                <Tag title={'default'} color={'success'} />
                <Tag
                    title={'outlined'}
                    type={'outlined'}
                    color={'success'}
                />
                <Tag
                    title={'dashed'}
                    type={'dashed'}
                    color={'success'}
                />
                <Tag
                    title={'ghost'}
                    type={'ghost'}
                    color={'success'}
                />
            </Row>
            <Row>
                <Tag title={'default'} color={'warning'} />
                <Tag
                    title={'outlined'}
                    type={'outlined'}
                    color={'warning'}
                />
                <Tag
                    title={'dashed'}
                    type={'dashed'}
                    color={'warning'}
                />
                <Tag
                    title={'ghost'}
                    type={'ghost'}
                    color={'warning'}
                />
            </Row>
            <Row>
                <Tag title={'default'} color={'danger'} />
                <Tag
                    title={'outlined'}
                    type={'outlined'}
                    color={'danger'}
                />
                <Tag
                    title={'dashed'}
                    type={'dashed'}
                    color={'danger'}
                />
                <Tag
                    title={'ghost'}
                    type={'ghost'}
                    color={'danger'}
                />
            </Row>
        </View>
    );
};
```
