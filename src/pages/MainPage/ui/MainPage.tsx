import React from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from 'app/providers/ErrorBoundary';

function MainPage() {
    const { t } = useTranslation('mainpage');
    return (
        <div>
            <BugButton />
            {t('Головна')}
        </div>
    );
}

export default MainPage;
