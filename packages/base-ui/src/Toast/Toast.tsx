import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, {
    FC,
    forwardRef,
    isValidElement,
    ReactNode,
    useContext,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import {
    ActivityIndicator,
    ColorValue,
    Dimensions,
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import { Font, FontProps } from '../Font';
// import { colorStringToRgba, rgbaMix } from '../utils/color';
import Svg, { Path } from 'react-native-svg';

type PositionType = 'center' | 'top' | 'bottom';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
// export interface ToastProps extends ToastBaseProps {}
type IconPositionType = 'left' | 'right' | 'top' | 'bottom';

type ToastUsedRefOption = {
    message?: string;
    duration?: number;
    onClose?: () => void;
    mask?: boolean;
    maskColor?: ColorValue;
    position?: PositionType;
    iconPosition?: IconPositionType;
};

export interface ToastUsedRef {
    info: (options: ToastUsedRefOption & { iconSource: ImageSourcePropType }) => void;
    close: () => void;
    loading: (options: ToastUsedRefOption) => void;
    fail: (options: ToastUsedRefOption) => void;
    success: (options: ToastUsedRefOption) => void;
    error: (options: ToastUsedRefOption) => void;
}

type IconStatusType = 'successIcon' | 'failIcon' | 'errorIcon' | 'loadingIcon';
type ToastIconProps = {
    [key in IconStatusType]?: ReactNode | ImageSourcePropType;
};
export interface ToastUsedProps extends ToastIconProps {
    iconStyle?: StyleProp<ImageStyle>;
    msgFrontProps?: FontProps;
    style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
    true: {
        // wordRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        minWidth: 96,
        minHeight: 46,
        maxWidth: 240,
    },
    false: {
        // wordColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        minWidth: 160,
        minHeight: 118,
        maxWidth: 248,
    },
    icon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        width: 96,
        height: 96,
    },
});
const iconStyles = StyleSheet.create<Record<IconPositionType | 'base', any>>({
    left: { width: 20, height: 20, marginRight: 8 },
    right: { width: 20, height: 20, marginLeft: 8 },
    top: { width: 48, height: 48, marginBottom: 8 },
    bottom: { width: 48, height: 48, marginTop: 8 },
    base: { width: 48, height: 48 },
});
export const ToastUsed = forwardRef<ToastUsedRef, ToastUsedProps>(
    ({ iconStyle = {}, msgFrontProps, successIcon, failIcon, errorIcon, loadingIcon, style }, ref) => {
        const onCloseRef = useRef(null);
        const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
        const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
        const [text, setText] = useState<string | undefined>(undefined);
        const [visible, setVisible] = useState(false);
        const [iconSource, setIconSource] = useState<null | ImageSourcePropType>(null);
        const [iconPosition, setIconPosition] = useState('top');
        const [mask, setMask] = useState(true);
        const [maskColor, setMaskColor] = useState<ColorValue>('transparent');
        const [position, setPosition] = useState<PositionType>('center');
        const [iconsGroup, setIcons] = useState<
            Record<IconStatusType, ReactNode | ImageSourcePropType | null | undefined>
        >({
            successIcon: successIcon,
            failIcon: failIcon,
            errorIcon: errorIcon,
            loadingIcon: loadingIcon,
        });
        const [toastStatus, setToastStatus] = useState<IconStatusType | 'icon'>('icon');
        const showToastBase = ({
            message = undefined,
            duration = 5000,
            onClose,
            mask = true,
            maskColor = 'transparent',
            iconPosition = 'top',
            position = 'center',
        }) => {
            if (onCloseRef.current) {
                onCloseRef.current();
            }
            if (timerRef.current) clearTimeout(timerRef.current); // 如果计时器仍在运行，先清除计时器
            if (onClose) onCloseRef.current = onClose;
            setText(message);
            setVisible(true);
            setMask(mask);
            setIconPosition(iconPosition);
            setMaskColor(maskColor);
            setPosition(position as PositionType);
            timerRef.current = setTimeout(() => {
                // 计时器到期后关闭 toast
                close();
                // 执行回调函数
                if (onCloseRef.current) onCloseRef.current();
            }, duration);
        };
        const loading = (options) => {
            setToastStatus('loadingIcon');
            showToastBase(options);
        };
        const info = (options) => {
            setToastStatus('icon');
            if (!options.iconPosition) {
                options.iconPosition = 'left';
            }
            setIconSource(options?.iconSource ?? undefined);
            showToastBase(options);
        };
        const success = (options) => {
            setToastStatus('successIcon');
            showToastBase(options);
        };
        const fail = (options) => {
            setToastStatus('failIcon');
            showToastBase(options);
        };
        const error = (options) => {
            setToastStatus('errorIcon');
            showToastBase(options);
        };

        const close = () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current); // 关闭计时器
                timerRef.current = null; // 将 timer 变量设为 null
                setText(undefined);
                setVisible(false);
            }
        };
        useImperativeHandle(ref, () => ({
            info,
            close,
            loading,
            fail,
            success,
            error,
            timer: timerRef,
        }));
        const maskStyle = StyleSheet.create({
            center: {
                alignItems: 'center',
                justifyContent: 'center',
            },
            top: {
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 20,
            },
            bottom: {
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingBottom: 20,
            },
        });

        return visible ? (
            <View
                style={[
                    {
                        position: 'absolute',
                        backgroundColor: maskColor || 'transparent',
                        width: screenWidth,
                        height: screenHeight,
                    },
                    maskStyle[position],
                ]}
                pointerEvents={mask ? undefined : 'box-none'}
            >
                <View
                    style={[
                        styles[
                            text === undefined ? 'icon' : String(iconPosition === 'left' || iconPosition === 'right')
                        ],
                        { backgroundColor: theme.bgColor, borderRadius: 12 },
                        style,
                    ]}
                >
                    {toastStatus === 'icon' && iconSource ? (
                        <Image
                            source={iconSource}
                            style={[iconStyles[text === undefined ? 'base' : iconPosition], iconStyle]}
                        />
                    ) : null}
                    {toastStatus === 'icon' ? null : iconsGroup[toastStatus] === undefined ? (
                        <View style={[iconStyles[iconPosition], {}]}>
                            <StatusDefaultIcon status={toastStatus} />
                        </View>
                    ) : isValidElement(iconsGroup[toastStatus]) ? (
                        iconsGroup[toastStatus]
                    ) : (
                        <Image
                            source={iconsGroup[toastStatus] as ImageSourcePropType}
                            style={[iconStyles[text === undefined ? 'base' : iconPosition], iconStyle]}
                        ></Image>
                    )}
                    {text && (
                        <Font level={'m14'} {...msgFrontProps}>
                            {text}
                        </Font>
                    )}
                </View>
            </View>
        ) : null;
    }
);
ToastUsed.displayName = 'Toast';

const StatusDefaultIcon: FC<{ status?: IconStatusType }> = ({ status }) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    switch (status) {
        case 'successIcon':
            return <SuccessDefaultIcon />;
        case 'failIcon':
            return <FailDefaultIcon />;
        case 'errorIcon':
            return <AlarmDefaultIcon />;
        case 'loadingIcon':
            return <ActivityIndicator size="large" style={{ marginBottom: 14 }} />;
        default:
            return null;
    }
};
const SuccessDefaultIcon: FC<{ color?: ColorValue; size?: 'large' | 'small' }> = ({
    color = '#000',
    size = 'large',
}) => {
    return (
        <Svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <Path
                d="M14.5598 23.5597C13.9745 24.145 13.9744 25.094 14.5597 25.6794L20.2929 31.4138C20.6834 31.8044 21.3166 31.8044 21.7072 31.4139L33.4387 19.6837C34.0248 19.0976 34.0249 18.1474 33.4388 17.5613C32.8526 16.9752 31.9024 16.9752 31.3163 17.5613L21 27.879L16.6794 23.5596C16.094 22.9744 15.1451 22.9744 14.5598 23.5597Z"
                fill={color}
            />
            <Path
                fill={color}
                d="M12.333 6.53914C15.7865 4.23163 19.8466 3 24 3C29.5696 3 34.911 5.21249 38.8493 9.15076C42.7875 13.089 45 18.4305 45 24C45 28.1534 43.7684 32.2135 41.4609 35.667C39.1534 39.1204 35.8736 41.812 32.0364 43.4015C28.1991 44.9909 23.9767 45.4068 19.9031 44.5965C15.8295 43.7862 12.0877 41.7861 9.15077 38.8492C6.21386 35.9123 4.21381 32.1705 3.40352 28.0969C2.59323 24.0233 3.0091 19.8009 4.59854 15.9636C6.18798 12.1264 8.8796 8.84665 12.333 6.53914ZM13.9997 38.9665C16.9598 40.9443 20.4399 42 24 42C28.7739 42 33.3523 40.1036 36.7279 36.7279C40.1036 33.3523 42 28.7739 42 24C42 20.4399 40.9443 16.9598 38.9665 13.9997C36.9886 11.0397 34.1774 8.73255 30.8883 7.37017C27.5992 6.00779 23.98 5.65133 20.4884 6.34586C16.9967 7.0404 13.7894 8.75473 11.2721 11.2721C8.75474 13.7894 7.04041 16.9967 6.34587 20.4884C5.65134 23.98 6.0078 27.5992 7.37018 30.8883C8.73255 34.1774 11.0397 36.9886 13.9997 38.9665Z"
            />
        </Svg>
    );
};

const FailDefaultIcon: FC<{ color?: ColorValue }> = ({ color = '#000' }) => {
    return (
        <Svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <Path
                d="M12.333 6.53914C15.7865 4.23163 19.8466 3 24 3C29.5696 3 34.911 5.21249 38.8493 9.15076C42.7875 13.089 45 18.4305 45 24C45 28.1534 43.7684 32.2135 41.4609 35.667C39.1534 39.1204 35.8736 41.812 32.0364 43.4015C28.1991 44.9909 23.9767 45.4068 19.9031 44.5965C15.8295 43.7862 12.0877 41.7861 9.15077 38.8492C6.21386 35.9123 4.21381 32.1705 3.40352 28.0969C2.59323 24.0233 3.0091 19.8009 4.59854 15.9636C6.18798 12.1264 8.8796 8.84665 12.333 6.53914ZM13.9997 38.9665C16.9598 40.9443 20.4399 42 24 42C28.7739 42 33.3523 40.1036 36.7279 36.7279C40.1036 33.3523 42 28.7739 42 24C42 20.4399 40.9443 16.9598 38.9665 13.9997C36.9886 11.0397 34.1774 8.73255 30.8883 7.37017C27.5992 6.00779 23.98 5.65133 20.4884 6.34586C16.9967 7.0404 13.7894 8.75473 11.2721 11.2721C8.75474 13.7894 7.04041 16.9967 6.34587 20.4884C5.65134 23.98 6.0078 27.5992 7.37018 30.8883C8.73255 34.1774 11.0397 36.9886 13.9997 38.9665Z"
                fill={color}
            />
            <Path d="M30 18L18 30" stroke={color} stroke-width="3" stroke-linecap="round" />
            <Path d="M18 18L30 30" stroke={color} stroke-width="3" stroke-linecap="round" />
        </Svg>
    );
};

const AlarmDefaultIcon: FC<{ color?: ColorValue }> = ({ color = '#000' }) => {
    return (
        <Svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <Path
                d="M24 12.0011C24.8284 12.0011 25.5 12.6727 25.5 13.5011V27C25.5 27.8284 24.8284 28.5 24 28.5C23.1716 28.5 22.5 27.8284 22.5 27V13.5011C22.5 12.6727 23.1716 12.0011 24 12.0011Z"
                fill={color}
            />
            <Path
                d="M25.7827 33.2999C25.7827 32.3059 24.9769 31.5 23.9828 31.5C22.9887 31.5 22.1829 32.3059 22.1829 33.2999C22.1829 34.294 22.9887 35.0999 23.9828 35.0999C24.9769 35.0999 25.7827 34.294 25.7827 33.2999Z"
                fill={color}
            />
            <Path
                d="M45 24C45 12.4021 35.5979 3 24 3C12.4021 3 3 12.4021 3 24C3 35.5979 12.4021 45 24 45C35.5979 45 45 35.5979 45 24ZM42 24C42 33.9412 33.9412 42 24 42C14.0588 42 6 33.9412 6 24C6 14.0588 14.0588 6 24 6C33.9412 6 42 14.0588 42 24Z"
                fill={color}
            />
        </Svg>
    );
};
