import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Counter } from 'entities/Counter';
function AboutPage() {
    var t = useTranslation('about').t;
    return (_jsxs("div", { children: [t('Про нас'), _jsx(Counter, {})] }));
}
export default AboutPage;
