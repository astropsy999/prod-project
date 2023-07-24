// Импортируем необходимые типы и функции из Redux Toolkit и Axios
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

// Импортируем схемы состояния из различных модулей
import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { AddCommentFormSchema } from '@/features/addCommentForm';
import { LoginSchema } from '@/features/authByUsername';
import { ProfileSchema } from '@/features/editableProfileCard';
import { ScrollSaveSchema } from '@/features/scrollSave';
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { rtkApi } from '@/shared/api/rtkApi';

// Определяем интерфейс для схемы состояния приложения
export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  scrollSave: ScrollSaveSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  // Асинхронные редьюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  // articleDetailsComments?: ArticleDetailsCommentSchema;
  // articleDetailsRecommendations?: ArticleDetailsRecommendationsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageSchema;
  articleDetailsPage?: ArticleDetailsPageSchema;
}

// Определяем тип для ключей схемы состояния
export type StateSchemaKey = keyof StateSchema;

// Определяем тип для объекта с информацией о подключенных редьюсерах
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

// Определяем интерфейс для менеджера редьюсеров
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // true - вмонтирован, false - демонтирован
  getMountedReducers: () => MountedReducers;
}

// Определяем интерфейс для расширенного хранилища Redux с возможностью управления редьюсерами
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

// Определяем интерфейс для дополнительных аргументов, передаваемых в thunk-функции
export interface ThunkExtraArg {
  api: AxiosInstance;
}

// Определяем интерфейс для конфигурации thunk-функций
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
