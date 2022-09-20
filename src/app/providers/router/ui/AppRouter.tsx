import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {AboutPage} from "pages/AboutPage";
import {MainPage} from "pages/MainPage";
import {routeConfig} from "shared/config/routeConfig/routeConfig";

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Завантаження...</div>}>
            <Routes>
                {Object.values(routeConfig).map(({element, path})=> (
                    <Route
                        key={path}
                        path={path}
                        element={(<div className="page-wrapper">{element}</div>)}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;