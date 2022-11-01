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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';
export var ButtonTheme;
(function (ButtonTheme) {
    ButtonTheme["CLEAR"] = "clear";
    ButtonTheme["CLEAR_INVERTED"] = "clear_inverted";
    ButtonTheme["OUTLINE"] = "outline";
    ButtonTheme["OUTLINE_INVERTED"] = "outline_inverted";
    ButtonTheme["BACKGROUND"] = "background";
    ButtonTheme["BACKGROUND_INVERTED"] = "background_inverted";
})(ButtonTheme || (ButtonTheme = {}));
export var ButtonSize;
(function (ButtonSize) {
    ButtonSize["M"] = "size_m";
    ButtonSize["L"] = "size_l";
    ButtonSize["XL"] = "size_xl";
})(ButtonSize || (ButtonSize = {}));
export var Button = function (props) {
    var _a;
    var className = props.className, children = props.children, theme = props.theme, square = props.square, _b = props.size, size = _b === void 0 ? ButtonSize.L : _b, otherProps = __rest(props, ["className", "children", "theme", "square", "size"]);
    var mods = (_a = {},
        _a[cls[theme]] = true,
        _a[cls.square] = square,
        _a[cls[size]] = true,
        _a);
    return (_jsx("button", __assign({ type: 'button', className: classNames(cls.Button, mods, [className]) }, otherProps, { children: children })));
};
