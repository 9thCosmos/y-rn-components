import { QuecPanelThemeConfig, QuecThemeContext } from '@quec/panel-theme';
import React, { FC, ReactNode, useContext, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Divider } from '../Divider';
import { Font } from '../Font';
import { Layout } from '../Layout';
import { rgbaMixFgColor1 } from '../utils/color';
// import chroma from 'chroma-js';
const ClearIcon: FC<{ color?: string }> = ({ color = '#080F19' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M12.0007 21.1663C17.0633 21.1663 21.1673 17.0623 21.1673 11.9997C21.1673 6.93706 17.0633 2.83301 12.0007 2.83301C6.93804 2.83301 2.83398 6.93706 2.83398 11.9997C2.83398 17.0623 6.93804 21.1663 12.0007 21.1663Z"
            fill={color}
            fill-opacity="0.4"
        />
        <Path
            d="M14.5917 9.40723L9.40625 14.5927"
            stroke="white"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <Path
            d="M9.4082 9.40723L14.5936 14.5927"
            stroke="white"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
);
type listDataItem = {
    id: number | string;
    icon?: React.ReactNode;
    last?: boolean;
    onPress?: () => void;
};
export interface SearchProps extends TextInputProps {
    inlineContentRight: ReactNode;
    insideLeft: ReactNode;
    isClear?: boolean;
    isSearch?: boolean;
    searchText: string;
    borderRadius: number;
    // insideRightIcon: FlatListProps<listDataItem>;
    insideRightIcon: listDataItem[];
    clear: () => void;
    search: (value: string) => void;
}

export const Search: FC<SearchProps> = ({
    isClear = true,
    isSearch = true,
    searchText = 'search',
    borderRadius = 20,
    inlineContentRight,
    inlineImageLeft,
    insideLeft = <Text>quec</Text>,
    clear = () => null,
    search = () => null,
    insideRightIcon = [],
    ...attributes
}) => {
    const theme: QuecPanelThemeConfig = useContext(QuecThemeContext);
    const [value, setValue] = useState();
    const styles = StyleSheet.create({
        inputShell: {
            backgroundColor: theme.bgColor,
            borderRadius: borderRadius,
            borderWidth: 1,
            paddingLeft: 12,
            paddingRight: 12,
            borderColor: rgbaMixFgColor1(theme, 'bgColor', theme.borderColor as string, 0.03),
        },
        insideLeft: { width: 20, overflow: 'hidden', marginRight: 4 },
    });
    if (isClear) {
        insideRightIcon.unshift({
            id: 100,
            icon: <ClearIcon />,
            onPress: () => {
                textInputRef.current.clear();
                clear();
            },
        });
    }
    if (isSearch) {
        insideRightIcon.push({
            id: 0,
            icon: (
                <Font level={'m10'} color={theme.primaryColor}>
                    {searchText}
                </Font>
            ),
            onPress: () => {
                search(value);
            },
        });
    }
    const textInputRef = useRef(null);

    return (
        <Layout widthFull row style={outStyles.shell}>
            {inlineImageLeft ? (
                <View style={[outStyles.inlineImageLeftShell, outStyles.verticallyCenter]}>
                    <View style={[outStyles.inlineImageLeftInsideShell]}> {inlineImageLeft}</View>
                </View>
            ) : (
                <></>
            )}
            <View
                style={[
                    outStyles.inputShell,
                    styles.inputShell,
                    outStyles.verticallyCenter,
                    outStyles.horizontallyCenter,
                ]}
            >
                {insideLeft ? <View style={[styles.insideLeft]}>{insideLeft}</View> : null}
                <TextInput
                    ref={textInputRef}
                    style={[outStyles.input]}
                    {...attributes}
                    placeholderTextColor={attributes?.placeholderTextColor ?? 'black'}
                />
                {insideRightIcon.map((item, index, array) => (
                    <Item
                        icon={item.icon}
                        onPress={item.onPress}
                        key={item.id}
                        id={item.id}
                        last={array.length === +index + 1}
                    />
                ))}
            </View>
            {inlineContentRight ? (
                <View
                    style={[
                        outStyles.inlineContentRightShell,
                        outStyles.verticallyCenter,
                        outStyles.horizontallyCenter,
                    ]}
                >
                    {inlineContentRight}
                </View>
            ) : null}
        </Layout>
    );
};

// const Item: FC<listDataItem> = ({ icon, onPress = () => {} }) => {
const Item: FC<listDataItem> = ({ icon, onPress = () => {}, last = false }) => {
    const styles = StyleSheet.create({
        line: {
            height: 16,
            // width: 1,
            marginHorizontal: 12,
        },
    });
    return (
        <Layout row center>
            <Pressable pressRetentionOffset={{ left: 8, right: 8 }} onPress={onPress}>
                {icon}
            </Pressable>
            {/* todo 暂时找不到合适的颜色后面出了再补 */}
            {!last ? <Divider vertical style={styles.line} weight={1} color={'rgba(0, 0, 0, 0.05)'} /> : null}
        </Layout>
    );
};

const outStyles = StyleSheet.create({
    shell: {
        height: 56,
        paddingVertical: 7,
        paddingHorizontal: 16,
    },
    inputShell: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
    },
    inlineImageLeftShell: {
        width: 18,
        height: '100%',
        marginRight: 6,
    },
    inlineImageLeftInsideShell: {
        height: 18,
        width: '100%',
        overflow: 'hidden',
    },
    inlineContentRightShell: {
        height: '100%',
        marginLeft: 6,
        overflow: 'hidden',
    },
    verticallyCenter: {
        display: 'flex',
        justifyContent: 'center',
    },
    horizontallyCenter: {
        display: 'flex',
        alignItems: 'center',
    },
});
