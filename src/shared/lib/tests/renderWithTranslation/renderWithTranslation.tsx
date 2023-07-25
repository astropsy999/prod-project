import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from '@/shared/config/i18n/i18nForTests';

/**
 * Функция renderWithTranslation для рендеринга компонента с поддержкой i18n.
 * @param component - Реакт-компонент, который нужно протестировать
 * @returns Объект, созданный функцией render из библиотеки @testing-library/react, с поддержкой i18n
 */
export function renderWithTranslation(component: ReactNode) {
  return render(
    <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>,
  );
}
