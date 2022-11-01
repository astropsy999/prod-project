var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function classNames(cls, mods, additional) {
    if (mods === void 0) { mods = {}; }
    if (additional === void 0) { additional = []; }
    return __spreadArray(__spreadArray([
        cls
    ], additional.filter(Boolean), true), Object.entries(mods)
        .filter(function (_a) {
        var classNames = _a[0], value = _a[1];
        return Boolean(value);
    })
        .map(function (_a) {
        var className = _a[0];
        return className;
    }), true).join(' ');
}
