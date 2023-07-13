import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';

// Начальное состояние для схемы пользователя
const initialState: UserSchema = {
  _inited: false,
};

// Создание среза пользователя
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Установка данных аутентификации
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features);
    },
    // Инициализация данных аутентификации
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        const json = JSON.parse(user) as User;
        state.authData = json;
        setFeatureFlags(json.features);
      }
      state._inited = true;
    },
    // Выход из системы
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder

      // Handle fulfilled action for fetching article by ID
      .addCase(
        saveJsonSettings.fulfilled,
        (state, { payload }: PayloadAction<JsonSettings>) => {
          if (state.authData) {
            state.authData.jsonSettings = payload;
          }
        },
      );
  },
});

// Генерация экшн-криэйторов для каждой функции-редьюсера
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
