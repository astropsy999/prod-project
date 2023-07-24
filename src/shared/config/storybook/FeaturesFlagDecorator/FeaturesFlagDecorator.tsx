import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types/featureFlags';

export const FeaturesFlagsDecorator =
  (features: FeatureFlags) => (StoryComponent: Story) => {
    // Установка фича флагов с помощью функции setFeatureFlags.
    setFeatureFlags(features);
    // Возвращение компонента StoryComponent.
    // Этот декоратор используется для изменения поведения компонентов,
    // обертывая их и предоставляя им дополнительные функциональные возможности.
    return <StoryComponent />;
  };
