import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Movie } from '../models/movie.model';
import { MovieActions, MovieActionTypes } from '../actions/movie.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface MovieState extends EntityState<Movie> {
  selectedMovie: Movie;
}

export const adapter: EntityAdapter<Movie> = createEntityAdapter<Movie>();

export const initialState: MovieState = adapter.getInitialState({ selectedMovie: null });

export function reducer(
  state = initialState,
  action: MovieActions
): MovieState {
  switch (action.type) {
    case MovieActionTypes.SelectMovie: {
      return { ...state, selectedMovie: action.payload.movie }
    }

    case MovieActionTypes.AddMovieSuccess: {
      return adapter.addOne(action.payload.movie, state);
    }

    case MovieActionTypes.UpsertMovie: {
      return adapter.upsertOne(action.payload.movie, state);
    }

    case MovieActionTypes.AddMovies: {
      return adapter.addMany(action.payload.movies, state);
    }

    case MovieActionTypes.UpsertMovies: {
      return adapter.upsertMany(action.payload.movies, state);
    }

    case MovieActionTypes.UpdateMovieSuccess: {
      return adapter.updateOne(action.payload.movie, state);
    }

    case MovieActionTypes.UpdateMovies: {
      return adapter.updateMany(action.payload.movies, state);
    }

    case MovieActionTypes.DeleteMovieSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case MovieActionTypes.DeleteMovies: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case MovieActionTypes.LoadMoviesSuccess: {
      return adapter.addAll(action.payload.movies, state);
    }

    case MovieActionTypes.ClearMovies: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const selectMovieState = createFeatureSelector<MovieState>('movie');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectMovieState);

export const selectSelectedMovie = createSelector(
  selectMovieState,
  (state: MovieState) => state.selectedMovie
);
