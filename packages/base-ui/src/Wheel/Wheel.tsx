import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

export type OptionType = {
    id: number;
    label: string;
    value: number;
    child: OptionType[] | undefined;
};
export const getObjList = (
    start: number,
    end: number,
    childCallBack?: (item: number) => OptionType[] | undefined
): OptionType[] => {
    return Array.from({ length: end + 1 - start }).map((item, index) => {
        const num = index + start;
        return {
            id: num,
            label: num >= 10 ? String(num) : '0' + num,
            value: num,
            child: childCallBack ? childCallBack(num) : undefined,
        };
    });
};

export interface WheelPropsBase {
    rowHeight?: number;
    rowNumber?: number;
    selectedFontSize?: number;
    opacityOffset?: number;
    sizeOffset?: number;
    commonTextStyle?: TextStyle;
    commonViewStyle?: ViewStyle;
    selectedTextStyle?: TextStyle;
    selectedViewStyle?: ViewStyle;
}
export interface WheelProps extends ViewProps, WheelPropsBase {
    option?: OptionType[];
    selected?: number;
    onValueChange?: (index: number, item: OptionType) => void;
}

export const Wheel: FC<WheelProps> = ({
    selected = 0,
    option,
    rowHeight = 50,
    rowNumber = 5,
    onValueChange,
    selectedFontSize = 24,
    opacityOffset = 0.2,
    sizeOffset = 4,
    commonTextStyle,
    commonViewStyle,
    selectedTextStyle,
    selectedViewStyle,
    ...props
}) => {
    if (option === undefined) {
        option = [{ id: 0, label: '', value: 0, child: undefined }];
    }
    const [selectedIndex, setSelectedIndex] = useState(selected);
    const flatRef = useRef<any>(null);
    const timeOutTimer = useRef<null | NodeJS.Timeout>(null);
    const timer = useRef<null | NodeJS.Timeout>(null);
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    const textStyleCopy: TextStyle = { color: theme.textColor.level1 };

    useEffect(() => {
        timer.current = setTimeout(() => {
            if (selected && option) {
                let selectedCopy = selected || 0;
                if (selectedCopy > option.length - 1) {
                    selectedCopy = option.length - 1;
                }
                if (selectedCopy < 0) {
                    selectedCopy = 0;
                }
                _scrollToIndex(selectedCopy);
            }
        }, 500);
        return () => {
            if (timer.current !== null) {
                clearTimeout(timer.current);
            }
            if (timeOutTimer.current !== null) {
                clearTimeout(timeOutTimer.current);
            }
        };
    }, []);

    useEffect(() => {
        let selectedCopy = selected || 0;
        if (selectedCopy > option.length - 1) {
            selectedCopy = option.length - 1;
        }
        if (selectedCopy < 0) {
            selectedCopy = 0;
        }
        _scrollToIndex(selectedCopy);
    }, [selected]);

    const _onScroll = ({ nativeEvent }: any) => {
        const offsetY = nativeEvent.contentOffset.y;
        // 滚动过程中，要保持选中效果维持在中间，选中效果的position一直跟随滚动
        const newSelectedIndex = offsetY <= 0 ? 0 : Math.round(offsetY / rowHeight) + 0;

        if (selectedIndex !== newSelectedIndex) {
            setSelectedIndex(newSelectedIndex);
        }

        if (timer.current !== undefined && timer.current !== null) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            if (Math.round(offsetY % rowHeight) === 0) {
                _onScrollEnd(offsetY);
            } else {
                const positionIndex = offsetY <= 0 ? 0 : Math.round(offsetY / rowHeight);
                _scrollToIndex(positionIndex);
            }
            //   _onMomentumScrollEnd(offsetY)
        }, 100);
    };

    const _onScrollEnd = (offsetY: number) => {
        const positionIndex = offsetY <= 0 ? 0 : Math.round(offsetY / rowHeight);
        onValueChange && onValueChange(positionIndex, option[positionIndex]);
    };
    const _scrollToIndex = (index: number) => {
        flatRef.current?.scrollToIndex({
            index,
            animated: true,
        });
    };

    return (
        <View {...props}>
            <FlatList
                ref={flatRef}
                data={option}
                keyExtractor={(item) => String(item.id)}
                getItemLayout={(data, index) => ({
                    length: rowHeight,
                    offset: rowHeight * index,
                    index,
                })}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={[
                                {
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                selectedIndex === index ? selectedViewStyle ?? {} : commonViewStyle ?? {},
                                { height: rowHeight },
                            ]}
                        >
                            <Text
                                style={getTextStyle(
                                    Math.abs(selectedIndex - index),
                                    selectedFontSize,
                                    opacityOffset,
                                    sizeOffset,
                                    selectedIndex === index,
                                    commonTextStyle ?? textStyleCopy,
                                    selectedTextStyle ?? textStyleCopy
                                )}
                            >
                                {item?.label ?? ''}
                            </Text>
                        </View>
                    );
                }}
                ListHeaderComponent={<View style={{ height: (rowHeight * (rowNumber - 1)) / 2, width: '100%' }} />}
                ListFooterComponent={<View style={{ height: (rowHeight * (rowNumber - 1)) / 2, width: '100%' }} />}
                onScroll={_onScroll}
                showsVerticalScrollIndicator={false}
                scrollsToTop={false}
            />
        </View>
    );
};
const getTextStyle = (
    index: number,
    selectedFontSize: number,
    opacityOffset: number,
    sizeOffset: number,
    isSelected: boolean,
    commonTextStyle: TextStyle,
    selectedTextStyle: TextStyle
): TextStyle => {
    return {
        fontSize: selectedFontSize - index * sizeOffset,
        opacity: 1 - index * opacityOffset,
        fontWeight: index === 0 ? 'bold' : 'normal',
        ...(isSelected ? selectedTextStyle : commonTextStyle),
    };
};
