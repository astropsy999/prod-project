import { LinkProps, NavLink } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

// Тип для вариантов стилизации ссылки
export type AppLinkVariant = 'primary' | 'red';

// Интерфейс для свойств компонента AppLink
interface AppLinkProps extends LinkProps {
  className?: string; // Дополнительный класс для ссылки
  variant?: AppLinkVariant; // Вариант стилизации ссылки ('primary' или 'red')
  children?: ReactNode; // Контент ссылки
  activeClassName?: string; // Класс, который будет добавлен к ссылке, если она активна
}

// Компонент AppLink
export const AppLink = memo((props: AppLinkProps) => {
  const {
    to, // Адрес ссылки
    className, // Дополнительный класс для ссылки
    children, // Контент ссылки
    variant = 'primary', // Вариант стилизации ссылки по умолчанию 'primary'
    activeClassName = '', // Класс для активной ссылки по умолчанию пустой
    ...otherProps
  } = props;

  return (
    <NavLink
      to={to} // Устанавливаем адрес ссылки
      className={({ isActive }) =>
        // Классы ссылки формируем с помощью функции classNames из библиотеки @/shared/lib/classNames/classNames
        classNames(
          cls.AppLink, // Основной класс стилизации ссылки
          { [activeClassName]: isActive }, // Условное добавление класса активной ссылки
          [className, cls[variant]], // Дополнительные классы из пропсов и класс для выбранного варианта стилизации
        )
      }
      {...otherProps} // Прочие пропсы передаем без изменений
    >
      {/* Выводим контент ссылки */}
      {children}
    </NavLink>
  );
});
