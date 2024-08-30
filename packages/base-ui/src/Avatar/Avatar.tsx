import { Image, Pressable, View, ViewProps } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import React, { FC, useContext } from 'react';
import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';

export interface AvatarProps extends ViewProps {
    size?: SizeType | number;
    title?: string;
    source?: string;
    icon?: React.ReactNode;
    onPress?: () => void;
}

type SizeType = 'small' | 'normal' | 'large';

const sizeMap: Record<SizeType, number> = {
    small: 56,
    normal: 60,
    large: 64,
};

const PersonSVG: FC<{ size: number }> = ({ size }) => (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <Path
            d="M44.3501 51.5H19.7001C17.4501 51.5 15.6001 49.65 15.6001 47.4C15.6001 40.05 21.5501 34.05 28.9501 34.05H35.1001C42.4501 34.05 48.4501 40 48.4501 47.4C48.4501 49.65 46.6501 51.5 44.3501 51.5ZM32.0501 33C26.4001 33 21.8001 28.4 21.8001 22.75C21.7501 17.1 26.3501 12.5 32.0001 12.5C37.6501 12.5 42.2501 17.1 42.2501 22.75C42.3001 28.45 37.6501 33 32.0501 33Z"
            fill="#080F19"
            fillOpacity="0.1"
        />
    </Svg>
);

// TODO 非圆形，文字类型头像是否支持？
// 接入图标库
export const Avatar: FC<AvatarProps> = ({ size = 'normal', title, source, onPress, icon, ...props }) => {
    let _size: number;
    if (typeof size !== 'number') {
        _size = sizeMap[size] || sizeMap.normal;
    } else {
        _size = size;
    }

    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);

    return (
        <Pressable onPress={onPress}>
            <View
                {...props}
                style={[
                    { width: _size, height: _size, borderRadius: _size / 2, backgroundColor: theme.textColor.stamp },
                    props.style,
                ]}
            >
                {source ? (
                    <Image source={{ uri: source }} style={{ width: _size, height: _size, borderRadius: _size / 2 }} />
                ) : (
                    <PersonSVG size={_size} />
                )}
            </View>
        </Pressable>
    );
};
