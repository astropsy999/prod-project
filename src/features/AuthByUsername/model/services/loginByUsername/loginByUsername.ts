import { User } from 'entities/User/';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from 'shared/config/i18n/i18n';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  { rejectValue: string }
>('login/loginByUsername', async (authData, thunkAPI) => {
  try {
    const response = await axios.post<User>(
      'http://localhost:8000/login',
      authData,
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue(i18n.t('Помилка'));
  }
});
