import React, { FC, useContext } from 'react';
import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import Svg, { Path, Rect } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

//svg高度与宽度的比例
const WITDH_HEIGHT = 1.8;

export interface BatteryProps {
    charging?: boolean;
    color?: string;
    percent?: number;
    width?: number;
}

// TODO 要提供无边框样式？
// TODO 边框颜色是否使用规范中的边框色？
// TODO 电量默认颜色是否使用规范中的成功色？
export const Battery: FC<BatteryProps> = ({ charging = false, color, percent = 100, width = 22 }) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);

    const formatPercent = (percent > 100 ? 100 : percent < 0 ? 0 : percent) / 100;

    let innerColor = color;

    if (!innerColor) {
        innerColor = theme.successColor;
        if (percent <= 20 && !charging) {
            innerColor = theme.dangerColor;
        }
    }

    return (
        <Svg width={width} height={width / WITDH_HEIGHT} viewBox="0 0 22 12" fill="none">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 1H19.0833C19.6356 1 20.0833 1.44772 20.0833 2V10C20.0833 10.5523 19.6356 11 19.0833 11H2C1.44772 11 1 10.5523 1 10V2C1 1.44772 1.44772 1 2 1ZM0 2C0 0.895431 0.895431 0 2 0H19.0833C20.1879 0 21.0833 0.895431 21.0833 2L21.0833 3C21.5896 3 22 3.41041 22 3.91667V8.08333C22 8.58959 21.5896 9 21.0833 9L21.0833 10C21.0833 11.1046 20.1879 12 19.0833 12H2C0.895432 12 0 11.1046 0 10V2Z"
                fill="#080F19"
                fillOpacity="0.1"
            />
            {charging ? (
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.88229 4.74726C6.68229 4.68726 6.59229 4.94726 6.74228 5.05726L11.4323 8.46726C11.5423 8.54726 11.6923 8.44726 11.6923 8.32726V7.37726C11.6923 7.17726 11.5923 6.60726 11.7123 6.40726C11.8523 6.37726 12.1023 6.49726 12.2223 6.53726C12.5723 6.62726 12.9123 6.72726 13.2723 6.82726L14.7923 7.24726C14.9923 7.30726 15.0723 7.04726 14.9223 6.93726L10.2423 3.52726C10.1323 3.44726 9.98228 3.55726 9.98228 3.67726V5.05726C9.98228 5.15726 10.0423 5.51726 9.95228 5.57726C9.88228 5.63726 9.65228 5.52726 9.57228 5.50726C8.67228 5.24726 7.77228 4.99726 6.88229 4.74726Z"
                    fill={innerColor}
                />
            ) : (
                <Rect x="2" y="2" width={17 * formatPercent} height="8" rx="1" fill={innerColor} />
            )}
        </Svg>
    );
};
