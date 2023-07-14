import { FeatureFlags } from '@/shared/types/featureFlags';

// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!

// Объявляем переменную featureFlags типа FeatureFlags
let featureFlags: FeatureFlags = {};

// Функция setFeatureFlags используется для установки значений featureFlags
export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  // Если передан новый набор фич, присваиваем его переменной featureFlags
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
}

// Функция getFeatureFlag возвращает значение конкретной фичи
export function getFeatureFlag(flag: keyof FeatureFlags) {
  // Возвращаем значение фичи из переменной featureFlags
  return featureFlags?.[flag];
}
