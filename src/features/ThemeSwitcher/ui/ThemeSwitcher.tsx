import { saveJsonSettings } from '@/entities/User';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';
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
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />}
      off={
        <ButtonDeprecated
          theme={ButtonTheme.CLEAR}
          className={classNames('', {}, [className])}
          onClick={onToggleHandler}
        >
          {/* Render the appropriate theme icon based on the current theme */}
          <IconDeprecated
            Svg={ThemeIconDeprecated}
            width={40}
            height={40}
            inverted
          />
        </ButtonDeprecated>
      }
    />
    // Render a button that triggers the theme toggle on click
  );
});
