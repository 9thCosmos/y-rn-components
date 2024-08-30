import {
    QPLightThemeConfig,
    QPThemeContext,
    QPThemeProvider,
} from '@quec/panel-theme';
import chroma from 'chroma-js';
import React, { FC, useContext, useState } from 'react';

const ColorBoard: FC<{
    name: string;
    onChangeTheme: (opt: any) => void;
}> = ({ onChangeTheme, name }) => {
    const theme = useContext(QPThemeContext);
    return (
        <div
            style={{
                display: 'flex',
                flexGrow: 1,
                marginBottom: 18,
            }}
        >
            {[0, 1, 2, 3].map((idx) => {
                return (
                    <div
                        key={idx}
                        style={{
                            flex: '1 1 0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 8,
                            padding: 12,
                            backgroundColor:
                                theme.color[name + idx],
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                fontWeight: 600,
                                color: theme.color[
                                    idx > 1 ? 'gy1' : 'gy8'
                                ],
                                lineHeight:
                                    idx === 1
                                        ? 'auto'
                                        : '27px',
                            }}
                        >
                            {name} {idx}
                            {idx === 1 && '（基色）'}
                            {idx === 1 && (
                                <input
                                    type="color"
                                    onChange={(e) => {
                                        onChangeTheme({
                                            [name +
                                            'Color']:
                                                e.target
                                                    .value,
                                        });
                                    }}
                                    value={
                                        theme.color[
                                            name + '1'
                                        ]
                                    }
                                />
                            )}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                color: theme.color[
                                    idx > 1 ? 'gy2' : 'gy7'
                                ],
                            }}
                        >
                            {chroma(theme.color[name + idx])
                                .hex('rgb')
                                .toUpperCase()}
                            {'    '}
                            {chroma(
                                theme.color[name + idx]
                            ).alpha() * 100}
                            %
                            {idx === 1 && (
                                <span
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        onChangeTheme({
                                            [name +
                                            'Color']:
                                                QPLightThemeConfig[
                                                    name +
                                                        'Color'
                                                ],
                                        });
                                    }}
                                >
                                    默认
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const GreyColorBoard = () => {
    const theme = useContext(QPThemeContext);
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                marginBottom: 24,
            }}
        >
            {new Array(11).fill(0).map((_, _idx) => {
                const idx = _idx + 1;
                return (
                    <div
                        key={idx}
                        style={{
                            flex: '1 1 0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 8,
                            padding: 12,
                            backgroundColor:
                                theme.color['gy' + idx],
                        }}
                    >
                        <div
                            style={{
                                fontWeight: 600,
                                color: theme.color[
                                    [5, 6, 7, 8].includes(
                                        idx
                                    )
                                        ? 'gy1'
                                        : 'gy8'
                                ],
                            }}
                        >
                            Grey {idx}
                        </div>
                        <div
                            style={{
                                color: theme.color[
                                    [5, 6, 7, 8].includes(
                                        idx
                                    )
                                        ? 'gy2'
                                        : 'gy7'
                                ],
                            }}
                        >
                            {chroma(theme.color['gy' + idx])
                                .hex('rgb')
                                .toUpperCase()}
                            {'    '}
                            {chroma(
                                theme.color['gy' + idx]
                            ).alpha() * 100}
                            %
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default () => {
    const changeTheme = (changedColor) => {
        setThemeConfig({
            ...themeConfig,
            ...changedColor,
        });
    };
    const [themeConfig, setThemeConfig] = useState(
        QPLightThemeConfig
    );
    return (
        <QPThemeProvider themeConfig={themeConfig}>
            <h3>品牌色 Brand Color</h3>
            <ColorBoard
                onChangeTheme={changeTheme}
                name="brand"
            />
            <h3>成功 Success Color</h3>
            <ColorBoard
                onChangeTheme={changeTheme}
                name="success"
            />
            <h3>警告 Warning Color</h3>
            <ColorBoard
                onChangeTheme={changeTheme}
                name="warning"
            />
            <h3>错误 Error Color</h3>
            <ColorBoard
                onChangeTheme={changeTheme}
                name="error"
            />
            <h3>文字/填充/描边 Neutral Color</h3>
            <p>内置颜色，无法修改，目前只支持亮色主题</p>
            <GreyColorBoard />
        </QPThemeProvider>
    );
};
