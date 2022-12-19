import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import { articleDetailsCommentsReducer } from './articleDetailsCommentSlice';
import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    comments: articleDetailsCommentsReducer,
    recommendations: articleDetailsPageRecommendationsReducer,
  });
