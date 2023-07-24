import { ReactElement } from 'react';
import { FeatureFlags } from '../../../../types/featureFlags';
import { getFeatureFlag } from '../../lib/setGetFeatures';

// Интерфейс пропсов компонента ToggleFeatures
interface ToggleFeaturesProps {
  feature: keyof FeatureFlags; // Свойство "feature" - ключ для доступа к фича-флагу из объекта FeatureFlags
  on: ReactElement; // Свойство "on" - элемент, который будет отображаться, если фича-флаг включен
  off: ReactElement; // Свойство "off" - элемент, который будет отображаться, если фича-флаг выключен
}

// Компонент ToggleFeatures
export const ToggleFeatures = (props: ToggleFeaturesProps) => {
  const { on, off, feature } = props;

  // Получаем значение фича-флага с помощью функции getFeatureFlag и переданного ключа "feature"
  const isFeatureEnabled = getFeatureFlag(feature);

  // Если фича-флаг включен (имеет значение true), возвращаем элемент "on"
  if (isFeatureEnabled) {
    return on;
  }

  // Если фича-флаг выключен (имеет значение false или undefined), возвращаем элемент "off"
  return off;
};
