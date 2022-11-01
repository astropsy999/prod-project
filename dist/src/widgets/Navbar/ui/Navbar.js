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
import { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';
export var Navbar = function (_a) {
    var className = _a.className;
    var t = useTranslation().t;
    var _b = useState(false), isAuthModal = _b[0], setIsAuthModal = _b[1];
    var onToggleModal = useCallback(function () {
        setIsAuthModal(function (prev) { return !prev; });
    }, []);
    return (_jsxs("div", __assign({ className: classNames(cls.Navbar) }, { children: [_jsx(Button, __assign({ theme: ButtonTheme.OUTLINE_INVERTED, className: cls.links, onClick: onToggleModal }, { children: t('Увійти') })), _jsx(Modal, __assign({ isOpen: isAuthModal, onClose: onToggleModal }, { children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque consectetur corporis cum deserunt dignissimos dolore dolores eius eos esse est eum eveniet harum hic incidunt inventore ipsa iste iure magnam magni maxime nam nulla numquam officia quae quia quidem sint soluta suscipit, tempore ullam veniam vero vitae. Minima, repudiandae!" }))] })));
};
export default Navbar;
