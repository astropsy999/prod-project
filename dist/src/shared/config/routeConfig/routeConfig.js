var _a, _b;
import { jsx as _jsx } from "react/jsx-runtime";
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/notFoundPage';
export var AppRoutes;
(function (AppRoutes) {
    AppRoutes["MAIN"] = "main";
    AppRoutes["ABOUT"] = "about";
    AppRoutes["NOT_FOUND"] = "not_found";
})(AppRoutes || (AppRoutes = {}));
export var RoutePath = (_a = {},
    _a[AppRoutes.MAIN] = '/',
    _a[AppRoutes.ABOUT] = '/about',
    _a[AppRoutes.NOT_FOUND] = '*',
    _a);
export var routeConfig = (_b = {},
    _b[AppRoutes.MAIN] = {
        path: RoutePath.main,
        element: _jsx(MainPage, {}),
    },
    _b[AppRoutes.ABOUT] = {
        path: RoutePath.about,
        element: _jsx(AboutPage, {}),
    },
    _b[AppRoutes.NOT_FOUND] = {
        path: RoutePath.not_found,
        element: _jsx(NotFoundPage, {}),
    },
    _b);
