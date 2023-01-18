import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';
// TODO
// eslint-disable-next-line paths-checking-plugin-ys/public-api-imports-ys
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';
// eslint-disable-next-line paths-checking-plugin-ys/public-api-imports-ys
import { addCommentFormReducer } from '@/features/addCommentForm/model/slices/addCommentFormSlice';
// eslint-disable-next-line paths-checking-plugin-ys/public-api-imports-ys
import { loginReducer } from '@/features/authByUsername/model/slice/loginSlice';
// eslint-disable-next-line paths-checking-plugin-ys/public-api-imports-ys
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice';
// eslint-disable-next-line paths-checking-plugin-ys/public-api-imports-ys
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

export function StoreDecorator(
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList,
) {
  return (StoryComponent: Story) => (
    <StoreProvider
      initialState={state}
      asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
      <StoryComponent />
    </StoreProvider>
  );
}
