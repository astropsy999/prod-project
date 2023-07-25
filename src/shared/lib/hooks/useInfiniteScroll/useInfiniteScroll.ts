import { MutableRefObject, useEffect, useRef } from 'react';

// Опции для хука useInfiniteScroll
export interface UseInfiniteScrollOptions {
  callback?: () => void; // Функция обратного вызова, которая будет выполнена при достижении конца списка
  triggerRef: MutableRefObject<HTMLElement>; // Ссылка на элемент, который используется для отслеживания прокрутки и определения, когда нужно загружать новые данные
  wrapperRef?: MutableRefObject<HTMLElement>; // Ссылка на обертку списка, используется для создания "контекста прокрутки" для IntersectionObserver
}

// Кастомный хук для реализации бесконечной прокрутки
export function useInfiniteScroll({
  callback,
  wrapperRef,
  triggerRef,
}: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const wrapperElement = wrapperRef?.current || null;
    const triggerElement = triggerRef.current;

    // Если передана функция обратного вызова, создаем новый экземпляр IntersectionObserver
    if (callback) {
      const options = {
        root: wrapperElement, // Устанавливаем обертку списка в качестве контекста прокрутки
        rootMargin: '0px',
        threshold: 1.0, // Устанавливаем порог 1.0, что означает, что элемент считается видимым, когда он полностью появляется в контексте прокрутки (обертке списка)
      };

      // Создаем новый IntersectionObserver с функцией обратного вызова
      observer.current = new IntersectionObserver(([entry]) => {
        // Если элемент становится видимым, вызываем функцию обратного вызова
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      // Начинаем отслеживать элемент, переданный как "триггер", с помощью IntersectionObserver
      observer.current.observe(triggerElement);
    }

    // Отключаем IntersectionObserver при размонтировании компонента или изменении зависимых значений
    return () => {
      if (observer.current && triggerElement) {
        observer.current.unobserve(triggerElement);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
}
