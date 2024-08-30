import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import {
    Pressable,
    StyleProp,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native';
import { Font } from '../Font';
// import { colorStringToRgba, rgbaMix } from '../utils/color';
import Svg, { Path } from 'react-native-svg';

type valueType = 'text' | 'input';
// export interface StepperProps extends TouchableOpacityProps, TouchableNativeFeedbackProps {
export interface StepperProps extends ViewProps {
    value: number;
    step?: number;
    maxValue?: number;
    minValue?: number;
    longPressSpeed?: number;
    changeValue: (val: number) => void;
    add?: ReactNode;
    reduce?: ReactNode;
    addStyle?: StyleProp<ViewStyle>;
    addColor?: string;
    reduceColor?: string;
    reduceStyle?: StyleProp<ViewStyle>;
    valueStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    disable?: boolean;
    valueType?: valueType;
    unit?: string;
}

const addSVG = (color) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 1.25C9 0.559642 8.55229 0 8 0C7.44772 0 7 0.559642 7 1.25V7H1.25C0.559642 7 0 7.44772 0 8C0 8.55229 0.559642 9 1.25 9H7V14.5833C7 15.2736 7.44772 15.8333 8 15.8333C8.55229 15.8333 9 15.2736 9 14.5833V9H14.5833C15.2736 9 15.8333 8.55229 15.8333 8C15.8333 7.44772 15.2736 7 14.5833 7H9V1.25Z"
                fill={color}
            />
        </Svg>
    );
};
const reduceSVG = (color) => {
    return (
        <Svg width="16" height="2" viewBox="0 0 16 2" fill={color}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 1C0 0.447715 0.559642 0 1.25 0H14.5833C15.2736 0 15.8333 0.447715 15.8333 1C15.8333 1.55228 15.2736 2 14.5833 2H1.25C0.559642 2 0 1.55228 0 1Z"
                fill={color}
            />
        </Svg>
    );
};

export const Stepper: FC<StepperProps> = ({
    value = 0,
    maxValue,
    minValue,
    step = 1,
    changeValue,
    disable = false,
    addStyle,
    addColor,
    reduceStyle,
    reduceColor,
    valueStyle,
    style,
    unit = '',
    valueType = 'text',
    longPressSpeed,
    ...attributes
}) => {
    const [val, setVal] = useState<number | string>(+value);
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    //todo: 命名
    const [isFocus, setsFocus] = useState(false);
    const textColor = theme.textColor;
    const pressColor = theme.pressColor;
    // TODO 类型确认，临时忽略
    // @ts-ignore
    // const disableColor = colorStringToRgba(textColor, 0.2);
    const svgColor = 'black';
    const valueStyles = StyleSheet.create({
        true: { flex: 1 },
        false: {},
    });
    const disableStyles = StyleSheet.create({
        true: { flex: 1 },
        false: {},
    });
    const styles = StyleSheet.create({
        shell: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
        },
        step: { height: 34, width: 50 },
        value: {
            marginLeft: 8,
            marginRight: 8,
            height: 34,
        },
        base: {
            borderColor: theme.stepperBorderColor,
            borderWidth: 1,
            borderRadius: 52,
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 16,
            paddingRight: 16,
        },
        center: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    const changeVal = (v) => {
        setVal(v);
        changeValue(+v);
    };
    const computeValue = (v: number) => {
        if (maxValue !== undefined && v > maxValue) {
            return maxValue;
            // 之后还要触发提示
        } else if (minValue !== undefined && v < minValue) {
            return minValue;
            // 之后还要触发提示
        } else {
            return v;
        }
    };
    const [addIntervalId, setAddInter] = useState(null);
    const [isAddLongPress, setIsAddInter] = useState(false);
    const [reduceIntervalId, setReduceInter] = useState(null);
    const [isReduceLongPress, setIsReduceInter] = useState(false);
    const addPress = () => {
        changeValue(computeValue(+val + step));
    };
    const addLongPress =
        longPressSpeed === undefined
            ? null
            : () => {
                  setIsAddInter(true);
                  //todo: 命名
                  const ai = setInterval(() => {
                      if (maxValue === undefined || Number(val) < maxValue) setVal(computeValue(+val + step));
                  }, longPressSpeed);
                  setAddInter(ai);
              };
    const addPressOut =
        longPressSpeed === undefined
            ? null
            : () => {
                  setIsAddInter(false);
                  clearInterval(addIntervalId);
                  setAddInter(null);
                  changeVal(+val);
              };
    const reducePress = () => {
        changeValue(computeValue(+val - step));
    };
    const reduceLongPress =
        longPressSpeed === undefined
            ? null
            : () => {
                  setIsReduceInter(true);
                  //todo: 命名
                  const ai = setInterval(() => {
                      if (minValue === undefined || Number(val) > minValue) setVal(computeValue(+val - step));
                  }, longPressSpeed);
                  setReduceInter(ai);
              };
    const reducePressOut =
        longPressSpeed === undefined
            ? null
            : () => {
                  setIsReduceInter(false);
                  clearInterval(reduceIntervalId);
                  setReduceInter(null);
                  changeVal(+val);
              };
    useEffect(() => {
        if (isAddLongPress) {
            addPressOut();
            addLongPress();
        }
        if (isReduceLongPress) {
            reducePressOut();
            reduceLongPress();
        }
    }, [val]);

    const minDis = () => !(!disable && (minValue === undefined || value > minValue));

    const maxDis = () => !(!disable && (maxValue === undefined || value < maxValue));

    useEffect(() => {
        changeVal(computeValue(value));
    }, [value]);

    const onBlurTextInput = () => {
        changeVal(computeValue(+val));
        setsFocus(false);
    };
    //todo: 可以用useCallback包起来
    const onChangeTextInput = (text: string) => {
        let isNegative: boolean;
        if (text === '0-') {
            setVal('-');
            return;
        }
        if (text[0] === '-') isNegative = true;
        const arr = text.match(/\d+/g);
        const res = arr ? arr.join('') : null;
        setVal(res ? Number(isNegative ? '-' + res : res) : 0);
    };
    return (
        <View style={[styles.shell, style]} {...attributes}>
            <TouchableHighlight
                style={[styles.center, styles.base, styles.step, reduceStyle, minDis() ? { opacity: 0.2 } : null]}
                onPress={minDis() ? null : reducePress}
                onLongPress={minDis() ? null : longPressSpeed === undefined ? null : reduceLongPress}
                onPressOut={longPressSpeed === undefined ? null : reducePressOut}
                underlayColor={pressColor}
            >
                {reduceSVG(reduceColor || svgColor)}
            </TouchableHighlight>
            <View
                style={StyleSheet.flatten([
                    styles.value,
                    styles.base,
                    styles.center,
                    //todo: 命名
                    valueStyles[isFocus.toString()],
                    valueStyle,
                ])}
            >
                {!isFocus ? (
                    <Pressable
                        disabled={valueType === 'text' || disable}
                        onPress={() => setsFocus(true)}
                        pressRetentionOffset={{ bottom: 8, left: 8, right: 8, top: 8 }}
                    >
                        <Font level={'m10'} color={textColor.level1}>
                            {value + unit}
                        </Font>
                    </Pressable>
                ) : (
                    //todo: 宽度
                    <TextInput
                        style={{ width: '100%', color: theme.textColor.level2, padding: 0 }}
                        value={val.toString()}
                        onChangeText={onChangeTextInput}
                        autoFocus={true}
                        onBlur={onBlurTextInput}
                        onFocus={() => {
                            setsFocus(true);
                        }}
                    />
                )}
            </View>
            <TouchableHighlight
                style={[styles.center, styles.base, styles.step, addStyle, maxDis() ? { opacity: 0.2 } : null]}
                onPress={maxDis() ? null : addPress}
                onLongPress={maxDis() ? null : longPressSpeed === undefined ? null : addLongPress}
                onPressOut={longPressSpeed === undefined ? null : addPressOut}
                underlayColor={pressColor}
            >
                {addSVG(addColor || svgColor)}
            </TouchableHighlight>
        </View>
    );
};
