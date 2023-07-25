import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { AppRouteByPathPattern, AppRoutes } from '@/shared/const/router';

// Хук useRouteChange для отслеживания изменений маршрута
export function useRouteChange() {
  const location = useLocation(); // Получение текущего объекта локации (URL)
  const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN); // Состояние для хранения текущего маршрута

  // Эффект useEffect отслеживает изменения URL
  useEffect(() => {
    // Проверяем каждый паттерн маршрута из константы AppRouteByPathPattern
    Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
      // Если текущий URL соответствует паттерну маршрута, устанавливаем соответствующий маршрут в состояние
      if (matchPath(pattern, location.pathname)) {
        setAppRoute(route);
      }
    });
  }, [location.pathname]); // Зависимость от URL, чтобы эффект вызывался при изменении маршрута

  return appRoute; // Возвращаем текущий маршрут
}
