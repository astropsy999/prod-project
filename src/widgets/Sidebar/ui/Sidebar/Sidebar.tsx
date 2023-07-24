// Импорт необходимых зависимостей из библиотек и модулей приложения
import { memo, useMemo, useState } from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

// Определение интерфейса SidebarProps с возможным свойством className
interface SidebarProps {
  className?: string;
}

// Определение компонента Sidebar с использованием memoization для оптимизации перерисовок
export const Sidebar = memo(({ className }: SidebarProps) => {
  // Использование useState для управления состоянием коллапса (свернутости) боковой панели
  const [collapsed, setCollapsed] = useState(false);

  // Получение списка элементов боковой панели с помощью кастомного хука useSidebarItems
  const sidebarItemsList = useSidebarItems();

  // Обработчик переключения состояния коллапса боковой панели
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  // Использование useMemo для мемоизации списка элементов боковой панели,
  // чтобы избежать ненужных перерисовок при изменении состояния коллапса или списка элементов
  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed, sidebarItemsList],
  );

  // Возвращение JSX разметки с использованием ToggleFeatures,
  // чтобы показывать разные версии боковой панели в зависимости от определенной фичи 'isAppRedesigned'
  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <aside
          data-testid='sidebar'
          className={classNames(
            cls.SidebarRedesigned,
            { [cls.collapsedRedesigned]: collapsed },
            [className],
          )}
        >
          <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
          <VStack role='navigation' gap='8' className={cls.items}>
            {itemsList}
          </VStack>
          <Icon
            data-testid='sidebar-toggle'
            onClick={onToggle}
            className={cls.collapseBtn}
            Svg={ArrowIcon}
            clickable
          />
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={cls.lang} />
          </div>
        </aside>
      }
      off={
        <aside
          data-testid='sidebar'
          className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
            className,
          ])}
        >
          <Button
            data-testid='sidebar-toggle'
            onClick={onToggle}
            className={cls.collapseBtn}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            square
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack role='navigation' gap='8' className={cls.items}>
            {itemsList}
          </VStack>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={cls.lang} />
          </div>
        </aside>
      }
    />
  );
});
