---
group: V1 待审查
toc: content
---

# Slider

## 用法

### 基本用法

```jsx
import { Slider, Button } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';
import { useState } from 'react';

export default () => {
    const [dis, setValue] = useState(false);
    const [value1, setValue1] = useState(-50);
    const [value2, setValue2] = useState(30);
    return (
        <View
            style={{
                // paddingVertical: 30,
                padding:30
            }}
        >
            <Button
                title={'50'}
                type={'solid'}
                onPress={() => {
                    setValue2(50);
                }}
            />
            <Button
                title={'30'}
                type={'solid'}
                onPress={() => {
                    setValue2(30);
                }}
            />
            <Slider
                onSlidingComplete={(value) => {
                    console.log('----onSlidingComplete---:  '+value)
                    setValue2(value);
                }}
                onValueChange={(value) => {
                    console.log('----onValueChange---: '+value)
                    setValue2(value);
                }}
                onSlidingStart={(value) => {
                    console.log('----onSlidingStart---: '+value)
                    setValue2(value);
                }}
                value={value2}
                max={100}
                step={10}
                min={10}
                showStep
                style={{marginTop:30}}
                thumbStyle={{backgroundColor:'transparent'}}
                trackStyle={{borderTopEndRadius:0,borderBottomEndRadius:0,backgroundColor:'red'}}
                sliderStyle={{overflow:'hidden'}}
            />
            <Slider
                onSlidingComplete={(value) => {
                    console.log('----onSlidingComplete---:  '+value)
                    setValue2(value);
                }}
                onValueChange={(value) => {
                    console.log('----onValueChange---: '+value)
                }}
                onSlidingStart={(value) => {
                    console.log('----onSlidingStart---: '+value)
                }}
                value={value2}
                max={100}
                step={0.1}
                min={10}
                style={{marginTop:30}}
                thumbStyle={{backgroundColor:'transparent'}}
                trackStyle={{borderTopEndRadius:0,borderBottomEndRadius:0}}
                sliderStyle={{overflow:'hidden'}}
            />
            <Slider
                onSlidingComplete={(value) => {
                }}
                onValueChange={(value) => {
                }}
                onSlidingStart={(value) => {
                }}
                value={value1}
                max={-40}
                step={10}
                min={-70}
                style={{marginTop:30}}
                thumbStyle={{
                    height:44,
                    width:44,
                    borderRadius:44,
                }}
                trackStyle={{borderTopEndRadius:0,minWidth:22,borderBottomEndRadius:0}}
                thumbCustom={<View style={{height:30,width:30,borderRadius:30,backgroundColor:'black'}} />}
            />
            <Slider
                onSlidingComplete={(value) => {
                    console.log('----onSlidingComplete---:  '+value)
                    // setValue1(value);
                }}
                onValueChange={(value) => {
                    console.log('----onValueChange---: '+value)
                }}
                onSlidingStart={(value) => {
                    console.log('----onSlidingStart---: '+value)
                }}
                value={value1}
                max={-40}
                step={10}
                min={-70}
                style={{marginTop:30}}
                thumbStyle={{
                    right:0,
                    height:28,
                    width:28,
                }}
                trackStyle={{padding:4,minWidth:36}}
                sliderStyle={{padding:4}}
            />
            <Slider
                onSlidingComplete={(value) => {
                }}
                onValueChange={(value) => {
                }}
                onSlidingStart={(value) => {
                }}
                value={value1}
                max={-10}
                step={10}
                min={-70} 
                style={{marginTop:30}}
                thumbStyle={{
                    right:0,
                    height:16,
                    width:4,
                }}
                trackStyle={{padding:10,borderRadius:10}}
                sliderStyle={{padding:4,borderRadius:12}}
            />
            <Slider
                onSlidingComplete={(value) => {
                    console.log('----onSlidingComplete---:  '+value)
                }}
                onValueChange={(value) => {
                    console.log('----onValueChange---: '+value)
                }}
                onSlidingStart={(value) => {
                    console.log('----onSlidingStart---: '+value)
                }}
                value={value1}
                max={-0}
                step={25}
                min={-100}
                showStep
                style={{marginTop:30}}
                thumbStyle={{
                    backgroundColor:'transparent'
                }}
                stepStyle={{height:16,width:4,marginRight:10}}
                trackStyle={{padding:0,borderRadius:10}}
                sliderStyle={{padding:4,borderRadius:12}}
            />
            <Slider
                onSlidingComplete={(value) => {
                    console.log('----onSlidingComplete---:  '+value)
                    setValue1(value);
                }}
                onValueChange={(value) => {
                    console.log('----onValueChange---: '+value)
                }}
                onSlidingStart={(value) => {
                    console.log('----onSlidingStart---: '+value)
                }}
                value={value1}
                max={-10}
                step={10}
                min={-70}
                showStep
                style={{marginTop:30}}
                sliderStyle={{height:15}}
            />
        </View>
    );
};
```

## 属性

| 参数名称          | 描述               | 类型            | 默认值 |
| :---------------- | :----------------- | :-------------- | :----- |
| value             | 值                 | number          | 0      |
| disabled          | 是否可以移动       | boolean         | false  |
| showStep          | 展示刻度           | boolean         | false  |
| min               | 最小值             | number          | 100    |
| max               | 最大值             | number          | 0      |
| step              | 步长               | number          | 1      |
| onValueChange     | 滑动中回调         | (value) => void |        |
| onSlidingStart    | 开始滑动回调       | (value) => void |        |
| onSlidingComplete | 手势结束回调       | (value) => void |        |
| style             | 滑块最外层容器样式 | ViewStyle       |        |
| sliderStyle       | 滑块容器样式       | ViewStyle       |        |
| trackStyle        | 轨道样式           | ViewStyle       |        |
| stepStyle         | 装饰点点的样式     | ViewStyle       |        |
| thumbStyle        | 滑块样式           | ViewStyle       |        |
| thumbCustom       | 滑块内元素         | ReactNode       |        |
| disTrackStyle     | 不可移动时轨道样式 | ViewStyle       |        |
| disThumbStyle     | 不可移动时滑块样式 | ViewStyle       |        |



## Slider.Double

## 用法

### 基本用法

```jsx
import { Slider, Button } from '@quec/panel-base-ui';
import { View, Text } from 'react-native';
import { useState } from 'react';

export default () => {
    const [dis, setValue] = useState(false);
    const [value2, setValue2] = useState([-90,-60]);
    return (
        <View
            style={{
                // paddingVertical: 30,
                padding:30
            }}
        >
            <Button
                title={'[-90,-60]'}
                type={'solid'}
                onPress={() => {
                    setValue2([-90,-60]);
                }}
            />
            <Slider.Double
                onSlidingComplete={(value) => {
                    console.log('----onSlidingComplete---:  '+value)
                    setValue2(value);
                }}
                onValueChange={(value) => {
                    console.log('----onValueChange---: '+value)
                }}
                onSlidingStart={(value) => {
                    console.log('----onSlidingStart---: '+value)
                }}
                value={value2}
                max={-50}
                step={10}
                min={-100}
                style={{marginTop:30}}
                thumbStyle={{backgroundColor:'transparent'}}
                trackStyle={{borderTopEndRadius:0,borderBottomEndRadius:0}}
                sliderStyle={{overflow:'hidden'}}
            />
            <Slider.Double
                onSlidingComplete={(value) => {
                    console.log('----onSlidingComplete---:  '+value)
                    setValue2(value);
                }}
                onValueChange={(value) => {
                    console.log('----onValueChange---: '+value)
                }}
                onSlidingStart={(value) => {
                    console.log('----onSlidingStart---: '+value)
                }}
                value={value2}
                max={-50}
                step={10}
                min={-100}
                style={{marginTop:30}}
                thumbStyle={{
                    height:44,
                    width:44,
                    borderRadius:44,
                }}
                trackStyle={{borderTopEndRadius:0,minWidth:22,borderBottomEndRadius:0}}
                thumbCustom={<View style={{height:30,width:30,borderRadius:30,backgroundColor:'black'}} />}
            />
            <Slider.Double
                onSlidingComplete={(value) => {
                    console.log('----onSlidingComplete---:  '+value)
                    setValue2(value);
                }}
                onValueChange={(value) => {
                    console.log('----onValueChange---: '+value)
                }}
                onSlidingStart={(value) => {
                    console.log('----onSlidingStart---: '+value)
                }}
                value={value2}
                max={-50}
                step={10}
                min={-100}
                style={{marginTop:30}}
                thumbStyle={[{
                    left:0,
                    height:28,
                    width:28,
                },{
                    right:0,
                    height:28,
                    width:28,
                }]}
                trackStyle={{padding:4,minWidth:36,borderRadius:50,overFlow:'hidden'}}
                sliderStyle={{padding:4}}
            />
            <Slider.Double
                onSlidingComplete={(value) => {
                    console.log('----onSlidingComplete---:  '+value)
                    setValue2(value);
                }}
                onValueChange={(value) => {
                    console.log('----onValueChange---: '+value)
                }}
                onSlidingStart={(value) => {
                    console.log('----onSlidingStart---: '+value)
                }}
                value={value2}
                max={-50}
                step={10}
                min={-100}
                style={{marginTop:30}}
                thumbStyle={{
                    right:0,
                    height:16,
                    width:4,
                }}
                trackStyle={{padding:10,borderRadius:10,}}
                sliderStyle={{padding:4,borderRadius:12}}
            />
            <Slider.Double
                onSlidingComplete={(value) => {
                    console.log('----onSlidingComplete---:  '+value)
                    setValue2(value);
                }}
                onValueChange={(value) => {
                    console.log('----onValueChange---: '+value)
                }}
                onSlidingStart={(value) => {
                    console.log('----onSlidingStart---: '+value)
                }}
                value={value2}
                max={-50}
                step={10}
                min={-100}
                showStep
                style={{marginTop:30}}
                thumbStyle={{
                    backgroundColor:'transparent'
                }}
                stepStyle={{height:16,width:4,marginRight:10}}
                trackStyle={{padding:0,borderRadius:10,}}
                sliderStyle={{padding:4,borderRadius:12}}
            />
            <Slider.Double
                onSlidingComplete={(value) => {
                    console.log('----onSlidingComplete---:  '+value)
                    setValue2(value);
                }}
                onValueChange={(value) => {
                    console.log('----onValueChange---: '+value)
                }}
                onSlidingStart={(value) => {
                    console.log('----onSlidingStart---: '+value)
                }}
                value={value2}
                max={-50}
                step={10}
                min={-100}
                showStep
                style={{marginTop:30}}
                sliderStyle={{height:15}}
            />
        </View>
    );
};
```

## 属性

| 参数名称          | 描述               | 类型                              | 默认值 |
| :---------------- | :----------------- | :-------------------------------- | :----- |
| value             | 值                 | [number,number]                   | 0      |
| disabled          | 是否可以移动       | boolean                           | false  |
| showStep          | 展示刻度           | boolean                           | false  |
| min               | 最小值             | number                            | 100    |
| max               | 最大值             | number                            | 0      |
| step              | 步长               | number                            | 1      |
| onValueChange     | 滑动中回调         | ([number,number]) => void         |        |
| onSlidingStart    | 开始滑动回调       | ([number,number]) => void         |        |
| onSlidingComplete | 手势结束回调       | ([number,number]) => void         |        |
| style             | 滑块最外层容器样式 | ViewStyle                         |        |
| sliderStyle       | 滑块容器样式       | ViewStyle                         |        |
| trackStyle        | 轨道样式           | ViewStyle                         |        |
| stepStyle         | 装饰点点的样式     | ViewStyle                         |        |
| thumbStyle        | 滑块样式           | ViewStyle \|[ViewStyle,ViewStyle] |        |
| thumbCustom       | 滑块内元素         | ReactNode                         |        |
| disTrackStyle     | 不可移动时轨道样式 | ViewStyle                         |        |
| disThumbStyle     | 不可移动时滑块样式 | ViewStyle \|[ViewStyle,ViewStyle] |        |
