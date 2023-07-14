import { saveJsonSettings } from '@/entities/User';
import ThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { memo, useCallback } from 'react';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  // Get the current theme and toggle function from the useTheme hook
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  // Define the toggle event handler
  const onToggleHandler = useCallback(() => {
    // Call the toggleTheme function with a callback to handle the new theme
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);

  return (
    // Render a button that triggers the theme toggle on click
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames('', {}, [className])}
      onClick={onToggleHandler}
    >
      {/* Render the appropriate theme icon based on the current theme */}
      <Icon Svg={ThemeIcon} width={40} height={40} inverted />
    </Button>
  );
});
