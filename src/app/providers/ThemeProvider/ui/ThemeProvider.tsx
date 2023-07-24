import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';

// Определяем интерфейс для свойств компонента ThemeProvider
interface ThemeProviderProps {
  initialTheme?: Theme; // Начальная тема (если она указана)
  children: ReactNode; // Дочерние элементы, которые будут обернуты в ThemeProvider
}

// Получаем сохраненную тему из локального хранилища
const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

// Компонент ThemeProvider, который предоставляет контекст с темой приложения
const ThemeProvider = (props: ThemeProviderProps) => {
  const { initialTheme, children } = props;
  const [isThemeInited, setThemeInited] = useState(false); // Флаг инициализации темы

  // Состояние для хранения текущей темы
  const [theme, setTheme] = useState<Theme>(
    initialTheme || fallbackTheme || Theme.LIGHT, // Если начальная тема не указана, используем сохраненную или тему по умолчанию (LIGHT)
  );

  // При первой инициализации компонента, устанавливаем начальную тему, если она указана
  useEffect(() => {
    if (!isThemeInited && initialTheme) {
      setTheme(initialTheme);
      setThemeInited(true);
    }
  }, [initialTheme, isThemeInited]);

  // При изменении темы, обновляем класс тела документа и сохраняем тему в локальном хранилище
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  // Создаем объект с значениями контекста для передачи дочерним компонентам
  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  // Возвращаем провайдер контекста с переданными дочерними элементами
  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
