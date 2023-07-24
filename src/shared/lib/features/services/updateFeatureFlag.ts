import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures';

// Интерфейс для параметров обновления фича-флагов
interface UpdateFeatureFlagsOptions {
  userId: string; // Идентификатор пользователя
  newFeatures: Partial<FeatureFlags>; // Новые значения фича-флагов
}

// Создаем асинхронный thunk для обновления фича-флагов
export const updateFeatureFlag = createAsyncThunk<
  void, // Возвращаемый результат - void (ничего)
  UpdateFeatureFlagsOptions, // Параметры - объект с типом UpdateFeatureFlagsOptions
  ThunkConfig<string> // Дополнительная конфигурация thunk с типом string
>('features/updateFeatureFlag', async ({ userId, newFeatures }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  // Объединяем все фича-флаги, включая новые значения
  const allFeatures = { ...getAllFeatureFlags(), ...newFeatures };

  try {
    // Отправляем запрос на обновление фича-флагов на сервере
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: allFeatures,
      }),
    );

    // Обновляем значения фича-флагов в локальном хранилище
    setFeatureFlags(allFeatures);

    // Перезагружаем страницу для применения обновленных фича-флагов
    window.location.reload();

    // Возвращаем undefined, так как результат асинхронной операции не требуется
    return undefined;
  } catch (e) {
    // Если возникла ошибка, логируем ее и возвращаем ошибку с помощью rejectWithValue
    console.log(e);
    return rejectWithValue('Ошибка обновления фичи');
  }
});
