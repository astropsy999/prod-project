var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import 'app/styles/index.scss';
import { ThemeProvider } from 'app/providers/ThemeProvider';
export var ThemeDecorator = function (theme) { return function (StoryComponent) {
    return (_jsx(ThemeProvider, __assign({ initialTheme: theme }, { children: _jsx("div", __assign({ className: "app ".concat(theme) }, { children: _jsx(StoryComponent, {}) })) })));
}; };
