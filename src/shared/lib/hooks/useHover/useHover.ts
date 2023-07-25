import { useCallback, useMemo, useState } from 'react';

// Интерфейс для объекта, возвращаемого хуком useHover
interface UseHoverBind {
  onMouseEnter: () => void; // Обработчик события наведения курсора на элемент
  onMouseLeave: () => void; // Обработчик события ухода курсора с элемента
}

// Тип результата, возвращаемого хуком useHover
type UseHoverResult = [boolean, UseHoverBind];

// Хук для отслеживания состояния наведения курсора на элемент
export const useHover = () => {
  // Состояние, показывающее, находится ли курсор над элементом
  const [isHover, setIsHover] = useState(false);

  // Функция для установки состояния "isHover" в значение true при наведении курсора
  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  // Функция для установки состояния "isHover" в значение false при уходе курсора
  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  // Возвращаем результат хука в виде массива с состоянием isHover и объектом с обработчиками событий
  return useMemo(
    () => [isHover, { onMouseEnter, onMouseLeave }],
    [isHover, onMouseLeave, onMouseEnter],
  );
};
