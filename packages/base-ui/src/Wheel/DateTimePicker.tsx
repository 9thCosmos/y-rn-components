import moment, { Moment } from 'moment';
import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { OptionType, Wheel, WheelPropsBase } from './index';

const initData = (start: Moment, end: Moment, type: keyof typeof MomentType) => {
    const level = getLevel(type);
    switch (type) {
        case MomentType.YYYY:
            return computeYear(start, end, level);
        case MomentType.YYYY_MM:
            return computeYear(start, end, level);
        case MomentType.YYYY_MM_DD:
            return computeYear(start, end, level);
        case MomentType.YYYY_MM_DD_HH:
            return computeYear(start, end, level);
        case MomentType.YYYY_MM_DD_HH_mm:
            return computeYear(start, end, level);
        case MomentType.YYYY_MM_DD_HH_mm_ss:
            return computeYear(start, end, level);
        case MomentType.HH_mm_ss:
            return computeHour(start, end, level);
        case MomentType.HH_mm:
            return computeHour(start, end, level);
        default:
            return computeYear(start, end, level);
    }
};
const getLevel = (type: keyof typeof MomentType): number => {
    switch (type) {
        case MomentType.YYYY:
            return MomentTypeLevel.YYYY;
        case MomentType.YYYY_MM:
            return MomentTypeLevel.YYYY_MM;
        case MomentType.YYYY_MM_DD:
            return MomentTypeLevel.YYYY_MM_DD;
        case MomentType.YYYY_MM_DD_HH:
            return MomentTypeLevel.YYYY_MM_DD_HH;
        case MomentType.YYYY_MM_DD_HH_mm:
            return MomentTypeLevel.YYYY_MM_DD_HH_mm;
        case MomentType.YYYY_MM_DD_HH_mm_ss:
            return MomentTypeLevel.YYYY_MM_DD_HH_mm_ss;
        case MomentType.HH_mm_ss:
            return MomentTypeLevel.HH_mm_ss;
        case MomentType.HH_mm:
            return MomentTypeLevel.HH_mm;
    }
    return 1;
};

export const MomentType = {
    YYYY: 'YYYY',
    YYYY_MM: 'YYYY-MM',
    YYYY_MM_DD: 'YYYY-MM-DD',
    YYYY_MM_DD_HH: 'YYYY-MM-DD HH',
    YYYY_MM_DD_HH_mm: 'YYYY-MM-DD HH:mm',
    YYYY_MM_DD_HH_mm_ss: 'YYYY-MM-DD HH:mm:ss',
    HH_mm: 'HH:mm',
    HH_mm_ss: 'HH:mm:ss',
};

const MomentTypeLevel = {
    YYYY: 1,
    YYYY_MM: 2,
    YYYY_MM_DD: 3,
    YYYY_MM_DD_HH: 4,
    YYYY_MM_DD_HH_mm: 5,
    YYYY_MM_DD_HH_mm_ss: 6,
    HH_mm: 2,
    HH_mm_ss: 3,
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
const getInitSelect = (
    data: OptionType[],
    selectTime: Moment,
    type: keyof typeof MomentType
): [Array<number>, Array<OptionType[]>] => {
    let selectYearIndexInit = 0;
    let selectMonthIndexInit = 0;
    let selectDateIndexInit = 0;
    let selectHourIndexInit = 0;
    let selectMinIndexInit = 0;
    let selectSecIndexInit = 0;

    let optionYearInit: OptionType[] | [] = [];
    let optionMonthInit: OptionType[] | [] = [];
    let optionDateInit: OptionType[] | [] = [];
    let optionHourInit: OptionType[] | [] = [];
    let optionMinInit: OptionType[] | [] = [];
    let optionSecInit: OptionType[] | [] = [];

    if (type.includes('YYYY')) {
        selectYearIndexInit = data.findIndex((yearItem) => yearItem.value === selectTime.year());
        optionYearInit = data;
        const yearChild = optionYearInit[selectYearIndexInit].child;
        if (type.includes('MM')) {
            selectMonthIndexInit = yearChild?.findIndex((monthItem) => {
                return monthItem.value === selectTime.month() + 1;
            });
            optionMonthInit = optionYearInit[selectYearIndexInit].child;
            const monthChild = optionMonthInit[selectMonthIndexInit].child;
            if (type.includes('DD')) {
                selectDateIndexInit = monthChild.findIndex((dateItem) => dateItem.value === selectTime.date());
                optionDateInit = optionMonthInit[selectMonthIndexInit].child;
                const dateChild = optionDateInit[selectDateIndexInit].child;
                if (type.includes('HH')) {
                    selectHourIndexInit = dateChild.findIndex((hourItem) => hourItem.value === selectTime.hour());
                    optionHourInit = optionDateInit[selectDateIndexInit].child;
                    const hourChild = optionHourInit[selectHourIndexInit].child;
                    if (type.includes('mm')) {
                        selectMinIndexInit = hourChild.findIndex((minItem) => minItem.value === selectTime.minute());
                        optionMinInit = optionHourInit[selectHourIndexInit].child;
                        const minChild = optionMinInit[selectMinIndexInit].child;
                        if (type.includes('ss')) {
                            selectSecIndexInit = minChild.findIndex((secItem) => secItem.value === selectTime.second());
                            optionSecInit = optionMinInit[selectMinIndexInit].child;
                            return [
                                [
                                    selectYearIndexInit,
                                    selectMonthIndexInit,
                                    selectDateIndexInit,
                                    selectHourIndexInit,
                                    selectMinIndexInit,
                                    selectSecIndexInit,
                                ],
                                [
                                    optionYearInit,
                                    optionMonthInit,
                                    optionDateInit,
                                    optionHourInit,
                                    optionMinInit,
                                    optionSecInit,
                                ],
                            ];
                        } else {
                            return [
                                [
                                    selectYearIndexInit,
                                    selectMonthIndexInit,
                                    selectDateIndexInit,
                                    selectHourIndexInit,
                                    selectMinIndexInit,
                                ],
                                [optionYearInit, optionMonthInit, optionDateInit, optionHourInit, optionMinInit],
                            ];
                        }
                    } else {
                        return [
                            [selectYearIndexInit, selectMonthIndexInit, selectDateIndexInit, selectHourIndexInit],
                            [optionYearInit, optionMonthInit, optionDateInit, optionHourInit],
                        ];
                    }
                } else {
                    return [
                        [selectYearIndexInit, selectMonthIndexInit, selectDateIndexInit],
                        [optionYearInit, optionMonthInit, optionDateInit],
                    ];
                }
            } else {
                return [
                    [selectYearIndexInit, selectMonthIndexInit],
                    [optionYearInit, optionMonthInit],
                ];
            }
        } else {
            return [[selectYearIndexInit], [optionYearInit]];
        }
    } else {
        if (type.includes('HH')) {
            selectHourIndexInit = data.findIndex((hourItem) => hourItem.value === selectTime.hour());
            optionHourInit = data;
            const hourChild = optionHourInit[selectHourIndexInit].child;
            if (type.includes('mm')) {
                selectMinIndexInit = hourChild.findIndex((minItem) => minItem.value === selectTime.minute());
            } else {
                return [[selectHourIndexInit], [optionHourInit]];
            }

            optionMinInit = optionHourInit[selectHourIndexInit].child;
            const minChild = optionMinInit[selectMinIndexInit].child;
            if (type.includes('ss')) {
                selectSecIndexInit = minChild.findIndex((secItem) => secItem.value === selectTime.second());
                optionSecInit = optionMinInit[selectMinIndexInit].child;
                return [
                    [selectHourIndexInit, selectMinIndexInit, selectSecIndexInit],
                    [optionHourInit, optionMinInit, optionSecInit],
                ];
            } else {
                return [
                    [selectHourIndexInit, selectMinIndexInit],
                    [optionHourInit, optionMinInit],
                ];
            }
        }
    }
    return [
        [
            selectYearIndexInit,
            selectMonthIndexInit,
            selectDateIndexInit,
            selectHourIndexInit,
            selectMinIndexInit,
            selectSecIndexInit,
        ],
        [optionYearInit, optionMonthInit, optionDateInit, optionHourInit, optionMinInit, optionSecInit],
    ];
};

export interface DateTimePickerProps extends WheelPropsBase {
    selectTime?: Moment;
    startTime?: Moment;
    endTime?: Moment;
    onValueChange?: (value: Moment) => void;
    timeType?: keyof typeof MomentType;
}
export const DateTimePicker: FC<DateTimePickerProps> = ({
    rowHeight = 54,
    rowNumber = 5,
    selectedFontSize,
    opacityOffset,
    sizeOffset,
    timeType = MomentType.YYYY_MM_DD_HH_mm as keyof typeof MomentType,
    selectTime,
    startTime = moment(),
    endTime = moment().add(10, 'year'),
    onValueChange = () => {},
    commonTextStyle,
    commonViewStyle,
    selectedTextStyle,
    selectedViewStyle,
}) => {
    const data = initData(startTime, endTime, timeType);
    const hasSelectTime =
        selectTime !== undefined &&
        selectTime.isValid() &&
        selectTime.isSameOrAfter(startTime) &&
        selectTime.isSameOrBefore(endTime);
    const reSelectTime = hasSelectTime ? selectTime : startTime;
    const yearFlex = timeType === MomentType.YYYY_MM_DD_HH_mm || timeType === MomentType.YYYY_MM_DD_HH_mm_ss ? 4 : 1;
    const commonFlex = timeType === MomentType.YYYY_MM_DD_HH_mm || timeType === MomentType.YYYY_MM_DD_HH_mm_ss ? 3 : 1;

    const [selectIndexInit, optionsInit] = getInitSelect(data, reSelectTime, timeType);
    const [selectedIndex, setSelectedIndex] = useState<number[]>(selectIndexInit);

    const [options, setOptions] = useState<Array<OptionType[]>>(optionsInit);

    const timer = useRef<null | NodeJS.Timeout>(null);
    useEffect(() => {
        return () => {
            if (timer.current !== null) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    const getResTime = (): Moment => {
        let arr;
        switch (timeType) {
            case MomentType.YYYY:
            case MomentType.YYYY_MM:
            case MomentType.YYYY_MM_DD:
            case MomentType.YYYY_MM_DD_HH:
            case MomentType.YYYY_MM_DD_HH_mm:
            case MomentType.YYYY_MM_DD_HH_mm_ss:
                arr = selectedIndex.map((selectedIndexItem, index) => {
                    if (index === 1) {
                        return options[index][selectedIndexItem].value - 1;
                    }
                    return options[index][selectedIndexItem].value;
                });
                return moment(arr);
            case MomentType.HH_mm:
            case MomentType.HH_mm_ss:
                arr = selectedIndex.map((selectedIndexItem, index) => {
                    return options[index][selectedIndexItem].value;
                });
                arr.unshift(...[0, 0, 0]);
                return moment(arr);
        }
        return moment();
    };

    //   输出结果
    useEffect(() => {
        if (timer.current !== undefined && timer.current !== null) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            onValueChange && onValueChange(getResTime());
        }, 100);
    }, [selectedIndex, options]);

    return (
        <View style={[dateTimePickerStyle.containerView, { width: '100%', height: rowHeight * rowNumber }]}>
            {selectedIndex.map((selectIndex, index) => (
                <Wheel
                    key={index.toString()}
                    style={{ flex: index === 0 ? yearFlex : commonFlex }}
                    selected={selectIndex}
                    onValueChange={(newSelectIndex) => {
                        const selectedIndexCopy = [...selectedIndex];
                        selectedIndexCopy.splice(index, 1, newSelectIndex);
                        if (index !== options.length - 1) {
                            const optionsCopy = [...options];
                            for (let i = index; i < options.length - 1; i++) {
                                const optionsCur = optionsCopy[i];

                                optionsCopy.splice(i + 1, 1, optionsCur[selectedIndexCopy[i]]?.child ?? []);
                                if (selectedIndexCopy[i + 1] !== undefined) {
                                    const changeChildIndex = getValidArrayIndex(
                                        optionsCur[selectedIndexCopy[i]]?.child ?? [],
                                        selectedIndexCopy[i + 1]
                                    );
                                    selectedIndexCopy.splice(i + 1, 1, changeChildIndex);
                                }
                            }
                            setOptions(optionsCopy);
                        }
                        setSelectedIndex(selectedIndexCopy);
                    }}
                    option={options[index]}
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
};

const dateTimePickerStyle = StyleSheet.create({
    containerView: { flexDirection: 'row', justifyContent: 'space-between' },
});

const getObjList = (
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

const seCArr = getObjList(0, 59); //ss
const minArr = getObjList(0, 59, () => {
    return seCArr;
}); //mm:ss
const hourArr = getObjList(0, 23, () => {
    return minArr;
}); //HH:mm:ss

const date31Arr = getObjList(1, 31, () => {
    return hourArr;
});
const date30Arr = getObjList(1, 30, () => {
    return hourArr;
});
const date29Arr = getObjList(1, 29, () => {
    return hourArr;
});
const date28Arr = getObjList(1, 28, () => {
    return hourArr;
});
const dateArr = {
    31: date31Arr,
    30: date30Arr,
    29: date29Arr,
    28: date28Arr,
};
//闰年
const leapYearArr = getObjList(1, 12, (month) => {
    switch (month) {
        case 2:
            return date29Arr;
        case 4:
        case 6:
        case 9:
        case 11:
            return date30Arr;
        default:
            return date31Arr;
    }
});
//平年
const commonMonthArr = getObjList(1, 12, (month) => {
    switch (month) {
        case 2:
            return date28Arr;
        case 4:
        case 6:
        case 9:
        case 11:
            return date30Arr;
        default:
            return date31Arr;
    }
});

const getAWholeYear = (year: number) => (moment([year]).isLeapYear() ? leapYearArr : commonMonthArr);

const getAWholeMonth = (daysInMonth: 31 | 30 | 29 | 28) => dateArr[daysInMonth];

const computeYear = (start: Moment, end: Moment, level: number): OptionType[] => {
    if (level === 1) {
        return getObjList(start.year(), end.year());
    }
    return getObjList(start.year(), end.year(), (year) => {
        if (year === start.year()) {
            return computeMonth(moment(start), moment(start).endOf('year'), level - 1);
        } else if (year === end.year()) {
            return computeMonth(moment(end).startOf('year'), moment(end), level - 1);
        } else {
            return getAWholeYear(year);
        }
    });
};
const computeMonth = (start: Moment, end: Moment, level: number): OptionType[] => {
    if (level === 1) {
        return getObjList(start.month() + 1, end.month() + 1);
    }
    return getObjList(start.month() + 1, end.month() + 1, (month) => {
        if (month === start.month() + 1) {
            return computeDate(moment(start), moment(start).endOf('month'), level - 1);
        } else if (month === end.month() + 1) {
            return computeDate(moment(end).startOf('month'), moment(end), level - 1);
        } else {
            return getAWholeMonth(moment(start).month(month).daysInMonth() as 31 | 30 | 29 | 28);
        }
    });
};
const computeDate = (start: Moment, end: Moment, level: number): OptionType[] => {
    if (level === 1) {
        return getObjList(start.date(), end.date());
    }
    return getObjList(start.date(), end.date(), (date) => {
        if (date === start.date()) {
            return computeHour(moment(start), moment(start).endOf('date'), level - 1);
        } else if (date === end.date()) {
            return computeHour(moment(end).startOf('date'), moment(end), level - 1);
        } else {
            return hourArr;
        }
    });
};
const computeHour = (start: Moment, end: Moment, level: number): OptionType[] => {
    if (level === 1) {
        return getObjList(start.hour(), end.hour());
    }
    return getObjList(start.hour(), end.hour(), (hour) => {
        if (hour === start.hour()) {
            return computeMin(moment(start), moment(start).endOf('hour'), level - 1);
        } else if (hour === end.hour()) {
            return computeMin(moment(end).startOf('hour'), moment(end), level - 1);
        } else {
            return minArr;
        }
    });
};
const computeMin = (start: Moment, end: Moment, level: number): OptionType[] => {
    if (level === 1) {
        return getObjList(start.minute(), end.minute());
    }
    return getObjList(start.minute(), end.minute(), (minute) => {
        if (minute === start.minute()) {
            return computeSec(moment(start), moment(start).endOf('minute'));
        } else if (minute === end.minute()) {
            return computeSec(moment(end).startOf('minute'), moment(end));
        } else {
            return seCArr;
        }
    });
};
const computeSec = (start: Moment, end: Moment): OptionType[] => {
    return getObjList(start.second(), end.second());
};
