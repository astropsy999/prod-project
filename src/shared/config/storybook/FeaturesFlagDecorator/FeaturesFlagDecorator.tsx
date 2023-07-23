import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types/featureFlags';

export const FeaturesFlagsDecorator =
  (features: FeatureFlags) => (StoryComponent: Story) => {
    setFeatureFlags(features);
    return <StoryComponent />;
  };
