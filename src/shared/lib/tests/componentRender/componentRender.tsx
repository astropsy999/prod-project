import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
// eslint-disable-next-line paths-checking-plugin-ys/layers-import-ys
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line paths-checking-plugin-ys/layers-import-ys
import '@/app/styles/index.scss';

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}

interface TestProviderProps {
  children: ReactNode;
  options?: componentRenderOptions;
}

/**
 * Компонент TestProvider, обеспечивающий провайдеры и настройки для тестирования компонентов
 * @param props - Свойства компонента TestProvider
 * @returns Обернутые провайдерами компоненты, готовые для тестирования
 */
export function TestProvider(props: TestProviderProps) {
  const { children, options = {} } = props;
  const {
    route = '/',
    initialState,
    asyncReducers,
    theme = Theme.LIGHT,
  } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider
          // @ts-ignore
          i18n={i18nForTests}
        >
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

/**
 * Функция componentRender для удобного рендеринга компонентов с необходимыми провайдерами
 * @param component - Реакт-компонент, который нужно протестировать
 * @param options - Настройки для TestProvider
 * @returns Объект, созданный функцией render из библиотеки @testing-library/react
 */
export function componentRender(
  component: ReactNode,
  options: componentRenderOptions = {},
) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}
