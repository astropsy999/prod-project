import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

// Создание контекста с функцией принудительного обновления компонентов
const ForceUpdateContext = createContext({
  value: true, // Значение по умолчанию, которое определяет, следует ли принудительно обновлять компоненты
  forceUpdate: () => {}, // Пустая функция, которая будет заменена на реальную функцию обновления
});

// Хук useForceUpdate возвращает функцию принудительного обновления компонентов
export const useForceUpdate = () => {
  const { forceUpdate } = useContext(ForceUpdateContext);
  return forceUpdate;
};

// Компонент ForceUpdateProvider предоставляет контекст с функцией принудительного обновления компонентов
export function ForceUpdateProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState(true); // Состояние, определяющее, следует ли принудительно обновлять компоненты

  // Функция принудительного обновления компонентов
  const forceUpdate = () => {
    // Установка обратного значения состояния для принудительного обновления
    setValue((prev) => !prev);

    // Задержка в 120 миллисекунд перед установкой исходного значения состояния
    setTimeout(() => {
      setValue((prev) => !prev);
    }, 120);
  };

  // Создание контекстного значения с помощью useMemo для оптимизации производительности
  const valueContext = useMemo(() => ({ value, forceUpdate }), [value]);

  // Если значение состояния value равно false, возвращаем null, чтобы предотвратить отображение дочерних компонентов
  if (!value) {
    return null;
  }

  // Возвращаем провайдер контекста с дочерними элементами (children) и контекстным значением
  return (
    <ForceUpdateContext.Provider value={valueContext}>
      {children}
    </ForceUpdateContext.Provider>
  );
}
