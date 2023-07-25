import { useCallback, useRef } from 'react';

/**
 * Хук useThrottle предназначен для создания функции обратного вызова с задержкой (throttle).
 * Он позволяет ограничить частоту вызовов функции обратного вызова, чтобы она не выполнялась слишком часто.
 *
 * @param callback Функция обратного вызова, которую необходимо задерживать.
 * @param delay Задержка в миллисекундах, определяющая частоту вызовов функции.
 * @returns Задержанную функцию обратного вызова.
 */
export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const throttleRef = useRef(false);

  return useCallback(
    (...args: any[]) => {
      if (!throttleRef.current) {
        // Вызываем переданную функцию обратного вызова с переданными аргументами
        callback(...args);
        // Устанавливаем флаг throttleRef в true, чтобы предотвратить повторный вызов функции
        throttleRef.current = true;

        // Устанавливаем таймер, который сбросит флаг throttleRef обратно в false через указанную задержку
        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay], // Зависимости для useCallback, которые пересоздаются только при изменении callback или delay
  );
}
