import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../../const/theme';

// Define the return type for the useTheme hook
interface UseThemeResult {
  toggleTheme: (saveAction?: (theme: Theme) => void) => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  // Define the toggleTheme function
  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
    let newTheme: Theme;

    // Switch between themes based on the current theme value
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

    // Set the new theme using the setTheme function from the context
    setTheme?.(newTheme);

    // Call the optional saveAction function with the new theme
    saveAction?.(newTheme);
  };

  // Return the theme and toggleTheme function as the result
  return {
    theme: theme || Theme.LIGHT, // Use a default theme if the theme is undefined
    toggleTheme,
  };
}
