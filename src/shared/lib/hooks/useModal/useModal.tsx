import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface UseModalProps {
  onClose?: () => void; // Функция, вызываемая при закрытии модального окна
  isOpen?: boolean; // Флаг, указывающий, открыто ли модальное окно
  animationDelay: number; // Задержка анимации закрытия модального окна в миллисекундах
}

/**
 * Переиспользуемый хук для управления состоянием модального компонента (drawer/modal)
 * @param animationDelay Задержка анимации закрытия модального окна
 * @param isOpen Флаг, указывающий, открыто ли модальное окно
 * @param onClose Функция, вызываемая при закрытии модального окна
 */
export function useModal({ animationDelay, isOpen, onClose }: UseModalProps) {
  const [isClosing, setIsClosing] = useState(false); // Флаг, указывающий, что модальное окно закрывается
  const [isMounted, setIsMounted] = useState(false); // Флаг, указывающий, что модальное окно примонтировано
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>; // Ссылка на таймер для анимации закрытия

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true); // Устанавливаем флаг isMounted в true, когда модальное окно открывается
    }
  }, [isOpen]);

  const close = useCallback(() => {
    if (onClose) {
      setIsClosing(true); // Устанавливаем флаг isClosing в true, когда модальное окно закрывается
      timerRef.current = setTimeout(() => {
        onClose(); // Вызываем функцию onClose после заданной задержки анимации закрытия
        setIsClosing(false); // Устанавливаем флаг isClosing обратно в false после закрытия модального окна
      }, animationDelay);
    }
  }, [animationDelay, onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close(); // Закрываем модальное окно при нажатии на клавишу Escape
      }
    },
    [close],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown); // Добавляем слушатель события keydown при открытом модальном окне
    }
    return () => {
      clearTimeout(timerRef.current); // Очищаем таймер при размонтировании компонента
      window.removeEventListener('keydown', onKeyDown); // Удаляем слушатель события keydown при закрытии модального окна
    };
  }, [isOpen, onKeyDown]);

  return {
    isClosing,
    isMounted,
    close,
  };
}
