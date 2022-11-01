import { createContext } from 'react';
export var Theme;
(function (Theme) {
    Theme["LIGHT"] = "app_light_theme";
    Theme["DARK"] = "app_dark_theme";
})(Theme || (Theme = {}));
export var ThemeContext = createContext({});
export var LOCAL_STORAGE_THEME_KEY = 'theme';
