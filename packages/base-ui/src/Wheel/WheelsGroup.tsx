import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { OptionType, Wheel, WheelPropsBase } from './index';

export interface WheelsGroupProps extends WheelPropsBase {
    selectedIndex?: number[];
    options: OptionType[];
    visibleItemCount?: number;
    onValueChange?: (value: OptionType[]) => void;
}

const getOptionsGroup = (data: Array<OptionType>, selectedIndexArr: number[]): Array<OptionType[]> => {
    const optionInit: Array<OptionType[]> = [];
    for (let i = 0; i < selectedIndexArr.length; i++) {
        const selectedIndex = selectedIndexArr[i];
        if (i === 0) {
            optionInit.push(data);
        } else {
            optionInit.push(optionInit[i - 1][selectedIndex].child);
        }
    }
    return optionInit;
};
const getValidArrayIndex = (arr: Array<any>, index: number) => {
    const len = arr.length;
    if (index < 0) {
        return 0;
    } else if (index > len - 1) {
        return len - 1;
    }
    return index;
};
const getMaxDepth = (options: OptionType[]): number => {
    let maxDepth = 1;
    options.forEach((op) => {
        if (op.child && op.child.length > 0) {
            // 递归计算子项的层数
            const childDepth = getMaxDepth(op.child);
            // 更新最大深度
            maxDepth = Math.max(maxDepth, childDepth + 1);
        }
    });
    return maxDepth;
};
export function WheelsGroup({
    rowHeight = 54,
    rowNumber = 5,
    selectedIndex,
    options,
    selectedFontSize,
    opacityOffset,
    sizeOffset,
    visibleItemCount,
    onValueChange,
    commonTextStyle,
    commonViewStyle,
    selectedTextStyle,
    selectedViewStyle,
}: WheelsGroupProps) {
    const maxLevel = getMaxDepth(options);
    const undefinedSelectedIndexInit = Array.from({ length: visibleItemCount ?? maxLevel }).fill(0) as number[];
    const [selectedIndexArr, setSelectedIndexArr] = useState<number[]>(selectedIndex ?? undefinedSelectedIndexInit);

    const [optionsGroup, setOptionsGroup] = useState<Array<OptionType[]>>(
        getOptionsGroup(options, selectedIndex ?? undefinedSelectedIndexInit)
    );

    const timer = useRef<null | NodeJS.Timeout>(null);
    useEffect(() => {
        return () => {
            if (timer.current !== null) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    //   输出结果
    useEffect(() => {
        if (timer.current !== undefined && timer.current !== null) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            const res = [];
            selectedIndexArr.forEach((item, index) => {
                if (optionsGroup[index]) {
                    res.push(optionsGroup[index][item]);
                }
            });
            onValueChange && onValueChange(res);
        }, 100);
    }, [selectedIndexArr, optionsGroup]);

    return (
        <View style={[dateTimePickerStyle.containerView, { width: '100%', height: rowHeight * rowNumber }]}>
            {selectedIndexArr.map((selectIndex, index) => (
                <Wheel
                    key={index.toString()}
                    style={{ flex: 1 }}
                    selected={selectIndex}
                    onValueChange={(newSelectIndex) => {
                        const selectedIndexArrCopy = [...selectedIndexArr];
                        selectedIndexArrCopy.splice(index, 1, newSelectIndex);
                        if (index !== selectedIndexArr.length - 1) {
                            const optionsCopy = [...optionsGroup];
                            for (let i = index; i < optionsGroup.length - 1; i++) {
                                const optionsCur = optionsCopy[i];

                                optionsCopy.splice(i + 1, 1, optionsCur[selectedIndexArrCopy[i]]?.child);
                                if (selectedIndexArrCopy[i + 1] !== undefined) {
                                    const changeChildIndex = getValidArrayIndex(
                                        optionsCur[selectedIndexArrCopy[i]]?.child ?? [],
                                        selectedIndexArrCopy[i + 1]
                                    );
                                    selectedIndexArrCopy.splice(i + 1, 1, changeChildIndex);
                                }
                            }
                            setOptionsGroup(optionsCopy);
                        }
                        setSelectedIndexArr(selectedIndexArrCopy);
                    }}
                    option={optionsGroup[index]}
                    rowHeight={rowHeight}
                    rowNumber={rowNumber}
                    selectedFontSize={selectedFontSize}
                    opacityOffset={opacityOffset}
                    sizeOffset={sizeOffset}
                    commonTextStyle={commonTextStyle}
                    commonViewStyle={commonViewStyle}
                    selectedTextStyle={selectedTextStyle}
                    selectedViewStyle={selectedViewStyle}
                />
            ))}
        </View>
    );
}

const dateTimePickerStyle = StyleSheet.create({
    containerView: { flexDirection: 'row', justifyContent: 'space-between' },
});
