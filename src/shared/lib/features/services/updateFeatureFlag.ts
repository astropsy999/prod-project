import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getAllFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagsOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlag = createAsyncThunk<
  void,
  UpdateFeatureFlagsOptions,
  ThunkConfig<string>
>('user/saveJsonSettings', async ({ userId, newFeatures }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: { ...getAllFeatureFlags(), ...newFeatures },
      }),
    );
    window.location.reload();
  } catch (e) {
    console.log(e);
    return rejectWithValue('Ошибка обновления фичи');
  }
});
