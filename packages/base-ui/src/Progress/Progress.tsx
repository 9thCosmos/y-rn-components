import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, useContext } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { Circle } from './circle';
import { Line } from './line';
type ProgressType = 'line' | 'circle' | 'circle_dashed';
type ProgressSize = 'small' | 'normal' | 'large';
export type ProgressStatus = 'active' | 'fail' | 'success';

export interface ProgressProps extends ViewProps {
    activeColor?: string; //进度条未完成状态颜色
    failColor?: string; //进度条失败状态颜色
    successColor?: string; //进度条成功状态颜色
    textColor?: string; //文字颜色
    progressType?: ProgressType; //进度条类型 可选择 （环形circle | 直线型line）
    showInfo?: boolean; //是否显示进度文字
    percent: number; //当前进度
    style?: StyleProp<ViewStyle>;
    size?: ProgressSize; //尺寸
    status: ProgressStatus; //状态
    showText?: string; //文字内容
}

export const Progress: FC<ProgressProps> = (props: ProgressProps) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    const { activeColor, failColor, successColor, progressType = 'line', percent } = props;
    const statusColorMap: Record<ProgressProps['status'], string> = {
        active: activeColor || theme.primaryColor,
        fail: failColor || theme.primaryColor,
        success: successColor || theme.primaryColor,
    };
    return progressType === 'line' ? (
        <View>
            <Line statusColorMap={statusColorMap} _percent={Math.min(100, percent)} {...props}></Line>
        </View>
    ) : (
        <View>
            <Circle statusColorMap={statusColorMap} _percent={Math.min(100, percent)} {...props}></Circle>
        </View>
    );
};
