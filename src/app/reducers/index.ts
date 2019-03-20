import * as fromMovie from '../movie/reducers/movie.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export const reducers: ActionReducerMap<any> = {
  movie: fromMovie.reducer
};
