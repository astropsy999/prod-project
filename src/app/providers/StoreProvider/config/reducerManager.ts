// Импортируем необходимые типы и функции из Redux Toolkit
import {
  AnyAction,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';

// Импортируем типы и функции, связанные с управлением редьюсерами
import {
  MountedReducers,
  ReducerManager,
  StateSchema,
  StateSchemaKey,
} from './StateSchema';

// Функция для создания менеджера редьюсеров
export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
  // Копируем исходные редьюсеры в новый объект
  const reducers = { ...initialReducers };

  // Комбинируем исходные редьюсеры в один общий редьюсер
  let combinedReducer = combineReducers(reducers);

  // Массив ключей редьюсеров, которые необходимо удалить из состояния
  let keysToRemove: Array<StateSchemaKey> = [];

  // Объект, который хранит информацию о подключенных редьюсерах
  const mountedReducers: MountedReducers = {};

  // Возвращаем объект, представляющий менеджер редьюсеров
  return {
    // Метод для получения текущего списка редьюсеров
    getReducerMap: () => reducers,

    // Метод для получения информации о подключенных редьюсерах
    getMountedReducers: () => mountedReducers,

    // Метод для обновления состояния при поступлении действия
    reduce: (state: StateSchema, action: AnyAction) => {
      // Если есть редьюсеры, которые необходимо удалить, выполняем удаление
      if (keysToRemove.length > 0) {
        state = { ...state };

        keysToRemove.forEach((key) => {
          delete state[key];
        });

        keysToRemove = [];
      }

      // Возвращаем обновленное состояние после применения общего редьюсера
      return combinedReducer(state, action);
    },

    // Метод для добавления нового редьюсера
    add: (key: StateSchemaKey, reducer: Reducer) => {
      // Проверяем, что ключ не пустой и такого редьюсера еще нет
      if (!key || reducers[key]) {
        return;
      }

      // Добавляем новый редьюсер и помечаем его как подключенный
      reducers[key] = reducer;
      mountedReducers[key] = true;

      // Обновляем общий редьюсер
      combinedReducer = combineReducers(reducers);
    },

    // Метод для удаления редьюсера по ключу
    remove: (key: StateSchemaKey) => {
      // Проверяем, что ключ не пустой и такой редьюсер существует
      if (!key || !reducers[key]) {
        return;
      }

      // Удаляем редьюсер из списка и добавляем ключ в массив для удаления из состояния
      delete reducers[key];
      keysToRemove.push(key);

      // Помечаем редьюсер как отключенный
      mountedReducers[key] = false;

      // Обновляем общий редьюсер
      combinedReducer = combineReducers(reducers);
    },
  };
}
