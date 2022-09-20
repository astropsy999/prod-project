import React from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss'
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {ThemeSwitcher} from "shared/ui/ThemeSwitcher";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    return (
        <div className={classNames(cls.Navbar)}>
            <div className={cls.links}>
                <AppLink theme={AppLinkTheme.SECONDARY} to={'/'} className={cls.mainLink}>Головна</AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>Про нас</AppLink>
            </div>

        </div>
    );
};

export default Navbar;










