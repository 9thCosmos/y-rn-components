import React, { createContext, FC } from 'react';
import { QPLightThemeConfig } from './themesV2';
import { QPTheme, QPThemeConfig } from './types';
import { createQPThemeContext } from './utils';

export * from './types';

export const QPThemeContext = createContext<QPTheme>(createQPThemeContext(QPLightThemeConfig));

export const QPThemeProvider: FC<{
    themeConfig?: QPThemeConfig;
}> = ({ children, themeConfig }) => {
    const themeContextValue = createQPThemeContext(themeConfig || QPLightThemeConfig);
    return <QPThemeContext.Provider value={themeContextValue}>{children}</QPThemeContext.Provider>;
};
