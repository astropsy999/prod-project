import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
function MainPage() {
    var t = useTranslation('mainpage').t;
    return _jsx("div", { children: t('Головна') });
}
export default MainPage;
