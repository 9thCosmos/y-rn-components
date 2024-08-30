import React, { FC, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ProgressProps } from './Progress';

export interface LineProps extends ProgressProps {
    statusColorMap: Record<ProgressProps['status'], string>;
    _percent: number;
}

const sizeMap: Record<ProgressProps['size'], number> = {
    small: 8,
    normal: 12,
    large: 16,
};

export const Line: FC<LineProps> = (props: LineProps) => {
    const { size = 'large', _percent, statusColorMap, status, showInfo = true, style, showText } = props;
    const currentPercent = useRef(new Animated.Value(_percent)).current;
    useEffect(() => {
        Animated.timing(currentPercent, {
            toValue: _percent,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [_percent]);
    const styles = StyleSheet.create({
        lineStyle: {
            flexDirection: 'row',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            ...{ style },

            // paddingHorizontal: 20,
        },
        outerStyle: {
            flex: 1,
            height: sizeMap[size],
            position: 'relative',
            backgroundColor: '#F7F8FC',
            // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            borderRadius: sizeMap[size] / 2,
        },
        innerStyle: {
            position: 'absolute',
            height: '90%',
            borderRadius: sizeMap[size] / 2,
            backgroundColor: statusColorMap[status],
        },
        fontStyle: {
            fontSize: 14,
            fontWeight: '700',
            fontStyle: 'normal',
            color: statusColorMap[status],
            fontFamily: 'DIN Alternate',
        },
    });
    return (
        <View style={[styles.lineStyle, style]}>
            <View style={[styles.outerStyle]}>
                <Animated.View
                    style={[
                        styles.innerStyle,
                        {
                            width: currentPercent.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                        },
                    ]}
                ></Animated.View>
            </View>
            {showInfo ? (
                <View
                    style={{
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {status === 'active' ? (
                        <Text style={[styles.fontStyle]}>{showText}</Text>
                    ) : status === 'success' ? (
                        <Svg width="16" height="16" viewBox="0 0 16 16">
                            <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.99978 15.1111C11.9271 15.1111 15.1109 11.9274 15.1109 8C15.1109 4.07264 11.9271 0.888885 7.99978 0.888885C4.07242 0.888885 0.888672 4.07264 0.888672 8C0.888672 11.9274 4.07242 15.1111 7.99978 15.1111ZM4.50165 8.15619C4.41364 8.25975 4.42978 8.40445 4.52964 8.49751L6.73171 10.5497C6.89351 10.7005 7.15156 10.7069 7.30873 10.5605L12.3605 5.85248C12.4662 5.75391 12.4736 5.60465 12.3727 5.51062L12.2567 5.40257C12.164 5.31615 11.9983 5.30933 11.8925 5.38943L7.18574 8.95344C7.09802 9.01986 6.93632 9.02749 6.84236 8.96896L5.06113 7.85934C4.9496 7.78986 4.79181 7.81479 4.70745 7.91404L4.50165 8.15619Z"
                                fill="#00CF63"
                            />
                        </Svg>
                    ) : (
                        <Svg width="16" height="16" viewBox="0 0 16 16">
                            <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.99978 15.1111C11.9271 15.1111 15.1109 11.9274 15.1109 8C15.1109 4.07264 11.9271 0.888885 7.99978 0.888885C4.07242 0.888885 0.888672 4.07264 0.888672 8C0.888672 11.9274 4.07242 15.1111 7.99978 15.1111ZM10.1943 5.17509L7.99442 7.37498L5.79453 5.17509C5.62096 5.00152 5.33955 5.00152 5.16599 5.17509C4.99242 5.34866 4.99242 5.63006 5.16599 5.80363L7.36588 8.00352L5.16599 10.2034C4.99242 10.377 4.99242 10.6584 5.16599 10.8319C5.33955 11.0055 5.62096 11.0055 5.79453 10.8319L7.99442 8.63206L10.1943 10.8319C10.3679 11.0055 10.6493 11.0055 10.8228 10.8319C10.9964 10.6584 10.9964 10.377 10.8228 10.2034L8.62295 8.00352L10.8228 5.80363C10.9964 5.63006 10.9964 5.34866 10.8228 5.17509C10.6493 5.00152 10.3679 5.00152 10.1943 5.17509Z"
                                fill="#FF4219"
                            />
                        </Svg>
                    )}
                </View>
            ) : null}
        </View>
    );
};
