---
group: V1 待审查
toc: content
---

# Toast

## 用法

见示例

```jsx
import React, { useState, useRef } from 'react';
import { Toast, Button, Layout,Divider } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';
const text =
    '提示';
const longText =
    '提示：/* 提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示 */';
export default () => {
    const [visible, setVisible] = useState(true);
    const properties = {
        type: 'outline',
        style: {
            height: 30,
            paddingHorizontal: -26,
            marginHorizontal: 6,
            marginBottom:30,
        },
        size: 'small',
        round: 'small',
    };
    const toastRef = useRef(null);
    return (
        <View>
            <Layout column widthFull heightFull >
                <Button
                    onPress={() => {
                        toastRef.current.info({
                            message:text,
                            duration:2000,
                            onClose:() => {
                                console.log('======== info-1 ====')
                            },
                            iconSource:{uri:'https://img2.baidu.com/it/u=1533744753,2457505042&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'}
                            }
                        );
                    }}
                    title={'info'}
                    {...properties}
                />
                <Button
                    onPress={() => {
                        toastRef.current.info({
                            message:text,
                            duration:2000,
                            mask:false,
                            position:'bottom',
                            onClose:() => {
                                console.log('======== info-position-bottom ====')
                            },
                            }
                        );
                    }}
                    title={'info-position-bottom'}
                    {...properties}
                />
                <Button
                    onPress={() => {
                        toastRef.current.info({
                            message:text,
                            duration:2000,
                            mask:false,
                            position:'center',
                            onClose:() => {
                                console.log('======== info-1 ====')
                            },
                            }
                        );
                    }}
                    title={'info-position-center'}
                    {...properties}
                />
                <Button
                    onPress={() => {
                        toastRef.current.info({
                            message:text,
                            duration:2000,
                            mask:false,
                            position:'top',
                            onClose:() => {
                                console.log('======== info-1 ====')
                            },
                            }
                        );
                    }}
                    title={'info-position-top'}
                    {...properties}
                />

                <Button
                    onPress={() => {
                        toastRef.current.success({
                            message:undefined,
                            duration:2000,
                            onClose:() => {
                                console.log('======== info-success ====')
                            }}
                        );
                    }}
                    title={'info-success'}
                    {...properties}
                />
                <Button
                    onPress={() => {
                        toastRef.current.success({
                            message:'info-success-text',
                            duration:2000,
                            onClose:() => {
                                console.log('======== info-success-text ====')
                            }}
                        );
                    }}
                    title={'info-success-text'}
                    {...properties}
                />
                <Button
                    onPress={() => {
                        toastRef.current.success({
                            message:'info-success-text',
                            iconPosition:'left',
                            duration:2000,
                            onClose:() => {
                                console.log('======== info-success-text ====')
                            }}
                        );
                    }}
                    title={'info-success-text-left'}
                    {...properties}
                />
                <Button
                    onPress={() => {
                        toastRef.current.info({
                            message:longText,
                            duration:2000,
                            onClose:() => {}}
                        );
                    }}
                    title={'info-longText'}
                    {...properties}
                />
                <Button
                    onPress={() => {
                        toastRef.current.loading(
                            {
                            duration:2000,
                            onClose:() => {}}
                        );
                    }}
                    title={'loading'}
                    {...properties}
                />
                <Button
                    onPress={() => {
                        toastRef.current.loading(
                            {
                            message:longText,
                            duration:2000,
                            iconPosition:'left',
                            onClose:() => {}}
                        );
                    }}
                    title={'loading has word'}
                    {...properties}
                />
            </Layout>
            <Toast ref={toastRef} />
        </View>
    );
};
```
## 属性

| 参数名称      | 描述                   | 类型                             | 默认值 |
| :------------ | :--------------------- | :------------------------------- | :----- |
| iconStyle     | 提示框icon默认样式     | ImageStyle;           |        |
| msgFrontProps | 提示词默认字体         | FontProps;                       |        |
| style         | 提示框默认样式         | ViewStyle;            |        |
| successIcon   | 提示框默认成功icon     | ReactNode \| ImageSourcePropType |        |
| failIcon      | 提示框默认失败icon     | ReactNode \| ImageSourcePropType |        |
| errorIcon     | 提示框默认告警icon     | ReactNode \| ImageSourcePropType |        |
| loadingIcon   | 提示框默认loading icon | ReactNode \| ImageSourcePropType |        |

## API

| API名称 | 描述              |
| :------ | :---------------- |
| info    | 简单信息提示      |
| close   | 关闭信息提示      |
| loading | 加载中提示        |
| success | 成功信息提示      |
| fail    | 失败信息提示      |
| error   | 错误/告警信息提示 |


## API-props 属性

| 参数名称     | 描述                                     | 类型                                   | 默认值                    |
| :----------- | :--------------------------------------- | :------------------------------------- | :------------------------ |
| message      | 提示信息内容                             | string                                 | undefined                 |
| duration     | 持续时间                                 | number                                 | 5000                      |
| onClose      | 关闭后回调                               | () => void                             | --                        |
| mask         | 是否显示透明蒙层，防止触摸穿透           | boolean                                | true                      |
| maskColor    | 蒙层背景颜色                             | ColorValue                             | 'trasparent'              |
| position     | 提示所在的位置                           | 'center' \| 'top' \| 'bottom'          | 'center'                  |
| iconPosition | 提示中icon所在的位置                     | 'left' \| 'right' \| 'top' \| 'bottom' | 'top'(info方法默认'left') |
| iconSource   | 提示中icon的iconSource（只有info有此项） | ImageSourcePropType                    | null                      |
