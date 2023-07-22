import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';
import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const NewDesignDecorator = (StoryComponent: Story) => {
  setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });
  return (
    <div className='app_redesigned'>
      <StoryComponent />
    </div>
  );
};
