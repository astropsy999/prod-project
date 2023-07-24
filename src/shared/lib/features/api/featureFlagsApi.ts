// Импорт зависимостей
import { rtkApi } from '@/shared/api/rtkApi'; // Импорт экземпляра API от Redux Toolkit Query
import { FeatureFlags } from '@/shared/types/featureFlags'; // Импорт типа FeatureFlags, представляющего объект с фича-флагами

// Определение интерфейса для параметров обновления фича-флагов
interface UpdateFeatureFlagsOptions {
  userId: string; // Идентификатор пользователя
  features: Partial<FeatureFlags>; // Частичный объект с фича-флагами для обновления
}

// Создание API для работы с фича-флагами, используя rtkApi.injectEndpoints
const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
      // Определение мутации для обновления фича-флагов
      query: ({ userId, features }) => ({
        url: `/users/${userId}`, // URL для отправки запроса
        method: 'PATCH', // HTTP метод запроса
        body: {
          features, // Тело запроса с переданными фича-флагами для обновления
        },
      }),
    }),
  }),
});

// Экспорт инициатора мутации для обновления фича-флагов
export const updateFeatureFlagsMutation =
  featureFlagsApi.endpoints.updateFeatureFlags.initiate;
