import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from './setGetFeatures';

// Интерфейс для параметров функции toggleFeatures
interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags; // Название фича-флага
  on: () => T; // Функция, которая будет вызвана, когда фича-флаг включен
  off: () => T; // Функция, которая будет вызвана, когда фича-флаг выключен
}

// Функция, которая включает/выключает функциональность на основе переданных параметров
export function toggleFeatures<T>({
  name,
  on,
  off,
}: ToggleFeaturesOptions<T>): T {
  if (getFeatureFlag(name)) {
    return on(); // Вызываем функцию on(), когда фича-флаг включен
  }
  return off(); // Вызываем функцию off(), когда фича-флаг выключен
}
