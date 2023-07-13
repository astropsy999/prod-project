import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';

// Create an asynchronous thunk action for fetching an article by its ID
export const fetchArticleById = createAsyncThunk<
  Article, // Return type of the async thunk action
  string | undefined, // Payload type of the async thunk action
  ThunkConfig<string> // Additional configuration for the thunk action
>('article/fetchArticleById', async (articleId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    // Make an API request to fetch the article by its ID
    const response = await extra.api.get<Article>(`/articles/${articleId}`, {
      params: { _expand: 'user' },
    });

    // Check if the response data and article ID exist
    if (!response.data || !articleId) {
      throw new Error();
    }

    // Return the fetched article
    return response.data;
  } catch (e) {
    console.log(e);
    // Handle errors and return a rejected promise with a specific value
    return rejectWithValue('Ошибка');
  }
});
