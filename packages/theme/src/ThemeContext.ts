import { createContext } from 'react';
import { QuecPanelThemeConfig } from './ThemeConfig';
import { quecPanelDefaultTheme } from './themes';

export const QuecThemeContext = createContext<QuecPanelThemeConfig>(quecPanelDefaultTheme);

export const QuecThemeProvider = QuecThemeContext.Provider;
