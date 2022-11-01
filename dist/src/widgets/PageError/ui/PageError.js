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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import cls from './PageError.module.scss';
export var PageError = function (_a) {
    var className = _a.className;
    var t = useTranslation().t;
    var reloadPage = function () {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };
    return (_jsxs("div", __assign({ className: classNames(cls.PageError, {}, [className]) }, { children: [_jsx("p", { children: t('Виникла непередбачена помилка') }), _jsx(Button, __assign({ onClick: reloadPage }, { children: t('Оновити сторінку') }))] })));
};
