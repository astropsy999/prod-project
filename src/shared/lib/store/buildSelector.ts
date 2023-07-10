import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

// Определяем тип функции селектора
type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T;

type Hook<T, Args extends any[]> = (...args: Args) => T;

// Определяем тип результата, включающего функцию хука useSelector и сам селектор
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

// Функция buildSelector принимает селектор и возвращает результат в виде массива
export function buildSelector<T, Args extends any[]>(
  selector: Selector<T, Args>,
): Result<T, Args> {
  // Создаем функцию хука useSelector, используя переданный селектор
  const useSelectorHook: Hook<T, Args> = (...args: Args) => {
    return useSelector((state: StateSchema) => selector(state, ...args));
  };

  // Возвращаем массив, содержащий функцию хука useSelector и сам селектор
  return [useSelectorHook, selector];
}
