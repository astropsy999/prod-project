import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { PageLoader } from '@/widgets/PageLoader';
import { routeConfig } from '../config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';

/**
 * Функция AppRouter представляет компонент, который отвечает за рендеринг и настройку маршрутов в приложении.
 * Компонент использует библиотеку react-router-dom для работы с маршрутизацией.
 * @returns
 */

function AppRouter() {
  /**
   * Функция renderWithWrapper используется для обертки элементов маршрутов.
   * Она принимает объект route с информацией о маршруте и возвращает элемент Route,
   * обернутый в компоненты Suspense и RequireAuth (если маршрут требует аутентификации).
   */
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      // Используется компонент Suspense для отложенной загрузки элемента
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            // Если маршрут требует аутентификации, оборачиваем элемент в компонент RequireAuth
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  // Возвращаем компонент Routes, в котором рендерятся все маршруты
  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
}

export default memo(AppRouter);
