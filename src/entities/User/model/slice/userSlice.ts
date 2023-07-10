import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';

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
});

// Генерация экшн-криэйторов для каждой функции-редьюсера
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
