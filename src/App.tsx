import React, {Suspense, useContext, useState} from 'react';
import './styles/index.scss';
import {Link, Route, Routes} from "react-router-dom";
import {AboutPageLazy} from "./pages/AboutPage/AboutPage.lazy";
import {MainPageLazy} from "./pages/MainPage/MainPage.lazy";
import {useTheme} from './theme/useTheme';
import {classNames} from "./helpers/classNames/classNames";



const App = () => {
    const {theme, toggleTheme} = useTheme()

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>TOGGLE</button>
            <Link to={'/'}>Головна</Link>
            <Link to={'/about'}>Про нас</Link>
            <Suspense fallback={<div>Завантаження...</div>}>
                <Routes>
                    <Route path={'/about'} element={<AboutPageLazy/>}/>
                    <Route path={'/'} element={<MainPageLazy/>}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;