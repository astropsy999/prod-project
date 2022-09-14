import React, {Suspense} from 'react';
import './styles/index.scss';
import {Link, Route, Routes} from "react-router-dom";
import {useTheme} from 'app/providers/ThemeProvider';
import {classNames} from "shared/lib/classNames/classNames";
import {AboutPage} from "pages/AboutPage";
import {MainPage} from "pages/MainPage";


const App = () => {
    const {theme, toggleTheme} = useTheme()

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>TOGGLE</button>
            <Link to={'/'}>Головна</Link>
            <Link to={'/about'}>Про нас</Link>
            <Suspense fallback={<div>Завантаження...</div>}>
                <Routes>
                    <Route path={'/about'} element={<AboutPage/>}/>
                    <Route path={'/'} element={<MainPage/>}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;