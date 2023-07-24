// Импортируем необходимые зависимости из библиотек React и Redux, а также хук для работы с роутингом
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// Импортируем функции для получения данных о пользователе и его ролях
import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';

// Импортируем функции для получения маршрутов приложения
import { getRouteMain, getRouteForbidden } from '@/shared/const/router';

// Интерфейс пропсов компонента
interface RequireAuthProps {
  children: JSX.Element; // JSX-элемент, переданный в компонент как потомок
  roles?: UserRole[]; // Массив с ролями пользователя
}

// Компонент 'RequireAuth', который проверяет авторизацию пользователя и его роли перед рендерингом дочерних элементов
export function RequireAuth({ children, roles }: RequireAuthProps) {
  // Получаем данные об авторизации пользователя и текущем местоположении (роуте)
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  // Получаем роли текущего пользователя
  const userRoles = useSelector(getUserRoles);

  // Вычисляем, соответствует ли роль пользователя одной из необходимых ролей
  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      // Если не указаны необходимые роли, то разрешаем доступ
      return true;
    }

    // Проверяем наличие хотя бы одной необходимой роли у пользователя
    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  // Если пользователь не авторизован, перенаправляем на главную страницу с сохранением предыдущего местоположения (роута)
  if (!auth) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  // Если пользователь не имеет необходимых ролей, перенаправляем на страницу с запретом доступа с сохранением предыдущего местоположения (роута)
  if (!hasRequiredRoles) {
    return (
      <Navigate to={getRouteForbidden()} state={{ from: location }} replace />
    );
  }

  // Если пользователь авторизован и имеет необходимые роли, рендерим дочерние элементы
  return children;
}
