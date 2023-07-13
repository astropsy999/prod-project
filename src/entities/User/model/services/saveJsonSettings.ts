import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

// Create an asynchronous thunk action for fetching an article by its ID
export const saveJsonSettings = createAsyncThunk<
  JsonSettings, // Return type of the async thunk action
  JsonSettings, // Payload type of the async thunk action
  ThunkConfig<string> // Additional configuration for the thunk action
>('user/saveJsonSettings', async (newJsonSettings, thunkAPI) => {
  const { rejectWithValue, getState, dispatch } = thunkAPI;

  const userData = getUserAuthData(getState());
  const currentSettings = getJsonSettings(getState());

  if (!userData) {
    return rejectWithValue('');
  }

  try {
    // Make an API request to fetch the article by its ID
    const response = await dispatch(
      setJsonSettingsMutation({
        userId: userData?.id,
        jsonSettings: {
          ...currentSettings,
          ...newJsonSettings,
        },
      }),
    ).unwrap();

    if (!response.jsonSettings) {
      return rejectWithValue('');
    }

    return response.jsonSettings;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
