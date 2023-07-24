import { createContext } from 'react';
import { Theme } from '@/shared/const/theme';

// Определение интерфейса для контекста темы
export interface ThemeContextProps {
  theme?: Theme; // Текущая тема (опционально)
  setTheme?: (theme: Theme) => void; // Функция для установки новой темы (опционально)
}

// Создание контекста темы с начальным значением, соответствующим интерфейсу ThemeContextProps
export const ThemeContext = createContext<ThemeContextProps>({});
