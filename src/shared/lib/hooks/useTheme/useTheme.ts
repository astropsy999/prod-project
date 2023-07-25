import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../../const/theme';

// Определение возвращаемого типа для хука useTheme
interface UseThemeResult {
  toggleTheme: (saveAction?: (theme: Theme) => void) => void; // Функция для переключения темы и опционального сохранения новой темы
  theme: Theme; // Текущая тема приложения
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  // Определение функции toggleTheme
  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
    let newTheme: Theme;

    // Переключение между темами на основе текущего значения темы
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;
      case Theme.LIGHT:
        newTheme = Theme.GDC;
        break;
      case Theme.GDC:
        newTheme = Theme.DARK;
        break;
      default:
        newTheme = Theme.GDC;
    }

    // Установка новой темы с использованием функции setTheme из контекста
    setTheme?.(newTheme);

    // Вызов опциональной функции saveAction с новой темой
    saveAction?.(newTheme);
  };

  // Возврат темы и функции toggleTheme в качестве результата хука
  return {
    theme: theme || Theme.LIGHT, // Использование темы по умолчанию, если тема не определена
    toggleTheme,
  };
}
