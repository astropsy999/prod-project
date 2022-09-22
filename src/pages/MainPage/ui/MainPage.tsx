import React from 'react';
import {useTranslation} from "react-i18next";

const MainPage = () => {
    const {t} = useTranslation('mainpage')
    return (
        <div>
            {t('Головна')}
        </div>
    );
};

export default MainPage;