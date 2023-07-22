import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
  getUserDataByidQuery,
} from '../../api/userApi';
import { User } from '../types/user';
import {
  LOCAL_STORAGE_LAST_DESIGN_KEY,
  USER_LOCALSTORAGE_KEY,
} from '../../../../shared/const/localstorage';

// Create an asynchronous thunk action for fetching an article by its ID
export const initAuthData = createAsyncThunk<
  User, // Return type of the async thunk action
  void, // Payload type of the async thunk action
  ThunkConfig<string> // Additional configuration for the thunk action
>('user/initAuthData', async (newJsonSettings, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;

  const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

  if (!userId) {
    return rejectWithValue('');
  }

  try {
    // Make an API request to fetch the article by its ID
    const response = await dispatch(getUserDataByidQuery(userId)).unwrap();

    localStorage.setItem(
      LOCAL_STORAGE_LAST_DESIGN_KEY,
      response.features?.isAppRedesigned ? 'new' : 'old',
    );

    if (!response.jsonSettings) {
      return rejectWithValue('');
    }

    return response;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
