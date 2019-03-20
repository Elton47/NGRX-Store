import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MovieActions, MovieActionTypes, LoadMoviesSuccess, AddMovie, AddMovieSuccess, DeleteMovie, DeleteMovieSuccess, UpdateMovie, UpdateMovieSuccess } from '../actions/movie.actions';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie.model';



@Injectable()
export class MovieEffects {


  @Effect()
  loadMovies$ = this.actions$.pipe(
    ofType(MovieActionTypes.LoadMovies),
    mergeMap(() => this.movieService.loadMovies().pipe(
      map((response: Movie[]) => new LoadMoviesSuccess({ movies: response }))
    ))
  );

  @Effect()
  addMovie$ = this.actions$.pipe(
    ofType(MovieActionTypes.AddMovie),
    mergeMap((action: AddMovie) => this.movieService.addMovie(action.payload.movie).pipe(
      map((response: Movie) => new AddMovieSuccess({ movie: response }))
    ))
  );

  @Effect()
  updateMovie$ = this.actions$.pipe(
    ofType(MovieActionTypes.UpdateMovie),
    mergeMap((action: UpdateMovie) => this.movieService.updateMovie(action.payload.id, action.payload.movie).pipe(
      map(() => new UpdateMovieSuccess({ movie: { id: action.payload.id, changes: action.payload.movie } }))
    ))
  );

  @Effect()
  deleteMovie$ = this.actions$.pipe(
    ofType(MovieActionTypes.DeleteMovie),
    mergeMap((action: DeleteMovie) => this.movieService.deleteMovie(action.payload.id).pipe(
      map(() => new DeleteMovieSuccess({ id: action.payload.id }))
    ))
  );


  constructor(private actions$: Actions<MovieActions>, private movieService: MovieService) {}

}
