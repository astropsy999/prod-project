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
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
export function componentRender(component, options) {
    if (options === void 0) { options = {}; }
    var _a = options.route, route = _a === void 0 ? '/' : _a, initialState = options.initialState;
    return render(_jsx(StoreProvider, __assign({ initialState: initialState }, { children: _jsx(MemoryRouter, __assign({ initialEntries: [route] }, { children: _jsx(I18nextProvider, __assign({ i18n: i18nForTests }, { children: component })) })) })));
}
