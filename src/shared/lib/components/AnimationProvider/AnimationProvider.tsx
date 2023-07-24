import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;
  isLoaded?: boolean;
}

/**
 * Компонент AnimationProvider является провайдером контекста анимационных библиотек. Он загружает анимационные модули при монтировании
 * компонента и создает объект значения контекста, который содержит ссылки на загруженные модули.
 * Этот объект передается в качестве значения контекста, чтобы дочерние компоненты могли использовать анимационные библиотеки и проверить,
 * когда они будут загружены и готовы к использованию.
 */

// Создаем контекст для анимации
const AnimationContext = createContext<AnimationContextPayload>({});

// Функция для асинхронной загрузки модулей анимации
const getAsyncAnimationModules = async () =>
  Promise.all([import('@react-spring/web'), import('@use-gesture/react')]);

// Хук для получения анимационных библиотек из контекста
export const useAnimationLibs = () =>
  useContext(AnimationContext) as Required<AnimationContextPayload>;

// Компонент-провайдер для анимационных библиотек
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const SpringRef = useRef<SpringType>();
  const GestureRef = useRef<GestureType>();
  const [isLoaded, setIsLoaded] = useState(false);

  // Загружаем модули анимации при монтировании компонента
  useEffect(() => {
    getAsyncAnimationModules().then(([Spring, Gesture]) => {
      SpringRef.current = Spring;
      GestureRef.current = Gesture;
      setIsLoaded(true);
    });
  }, []);

  // Создаем объект значения контекста для передачи анимационных библиотек
  const value = useMemo(
    () => ({
      Gesture: GestureRef.current,
      Spring: SpringRef.current,
      isLoaded,
    }),
    [isLoaded],
  );

  // Оборачиваем дочерние элементы в провайдер контекста
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
