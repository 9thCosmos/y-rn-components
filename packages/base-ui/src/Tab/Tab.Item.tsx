import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Font } from '../Font';
import { TabBarProps } from './TabBar';

type badgeType = 'dot' | 'number';

export interface TabItemProps extends Omit<TabBarProps, 'active'> {
    //tab标题
    title: string;
    //是否被选中
    isActive?: boolean;
    icon?: string;
    //徽标类型
    badge?: badgeType;
    //徽标数值
    badgeNum?: number;
    activeColor?: string;
}

export const TabItem: FC<TabItemProps> = (props: TabItemProps) => {
    const { title, isActive, icon, badge, badgeNum = 0, activeColor, tabBarLayout = 'vertical' } = props;
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    const highlightColor = activeColor || theme.primaryColor;
    const styles = StyleSheet.create({
        activeStyle: {
            opacity: 1,
            color: highlightColor,
        },
        unactiveStyle: {
            opacity: 0.9,
            color: '#000000',
        },
        //有数字徽标样式
        badgeWithNum: {
            backgroundColor: '#D54941',
            position: 'absolute',
            top: 5,
            right: 8,
            width: 16,
            height: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
        },
        //无数字徽标样式
        badgeWithoutNum: {
            backgroundColor: 'red',
            position: 'absolute',
            top: 10,
            right: 10,
            width: 6,
            height: 6,
            borderRadius: 3,
        },
    });
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: tabBarLayout === 'vertical' ? 'column' : 'row',
            }}
        >
            {/* 占位，后期用图标库中的图标 */}
            {icon !== undefined ? (
                <Svg width="15" height="15" viewBox="0 0 21 20">
                    <Path
                        d="M14.937 2.1875C17.0081 2.1875 18.687 3.86643 18.687 5.9375C18.687 8.00857 17.0081 9.6875 14.937 9.6875C12.8659 9.6875 11.187 8.00857 11.187 5.9375C11.187 3.86643 12.8659 2.1875 14.937 2.1875ZM12.437 5.9375C12.437 7.31821 13.5563 8.4375 14.937 8.4375C16.3177 8.4375 17.437 7.31821 17.437 5.9375C17.437 4.55679 16.3177 3.4375 14.937 3.4375C13.5563 3.4375 12.437 4.55679 12.437 5.9375Z"
                        fill={isActive ? highlightColor : '#000000'}
                    />
                    <Path
                        d="M3.37451 3.75C3.37451 3.05964 3.93416 2.5 4.62451 2.5H8.99951C9.68987 2.5 10.2495 3.05964 10.2495 3.75V8.125C10.2495 8.81536 9.68987 9.375 8.99951 9.375H4.62451C3.93416 9.375 3.37451 8.81536 3.37451 8.125V3.75ZM4.62451 3.75V8.125H8.99951V3.75H4.62451Z"
                        fill={isActive ? highlightColor : '#000000'}
                    />
                    <Path
                        d="M3.37451 11.875C3.37451 11.1846 3.93416 10.625 4.62451 10.625H8.99951C9.68987 10.625 10.2495 11.1846 10.2495 11.875V16.25C10.2495 16.9404 9.68987 17.5 8.99951 17.5H4.62451C3.93416 17.5 3.37451 16.9404 3.37451 16.25V11.875ZM4.62451 11.875V16.25H8.99951V11.875H4.62451Z"
                        fill={isActive ? highlightColor : '#000000'}
                    />
                    <Path
                        d="M11.4995 11.875C11.4995 11.1846 12.0592 10.625 12.7495 10.625H17.1245C17.8149 10.625 18.3745 11.1846 18.3745 11.875V16.25C18.3745 16.9404 17.8149 17.5 17.1245 17.5H12.7495C12.0592 17.5 11.4995 16.9404 11.4995 16.25V11.875ZM12.7495 16.25H17.1245V11.875H12.7495V16.25Z"
                        fill={isActive ? highlightColor : '#000000'}
                    />
                </Svg>
            ) : null}
            <Font
                level={icon === undefined ? 'm10' : 'r10'}
                style={isActive ? styles.activeStyle : styles.unactiveStyle}
            >
                {title}
            </Font>
            {badge ? (
                <View style={badge === 'dot' ? styles.badgeWithoutNum : styles.badgeWithNum}>
                    {badge === 'number' ? <Text style={{ fontSize: 4, color: '#fff' }}>{badgeNum}</Text> : null}
                </View>
            ) : null}
        </View>
    );
};

TabItem.displayName = 'Tab.Item';
