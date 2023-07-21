import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage';
import { FeatureFlags } from '@/shared/types/featureFlags';

// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!

const defaultFeatures = {
  isAppRedesigned:
    localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};

// Объявляем переменную featureFlags типа FeatureFlags
let featureFlags: FeatureFlags = {
  ...defaultFeatures,
};

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
export function getAllFeatureFlags() {
  return featureFlags;
}
