import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MovieActions, MovieActionTypes, LoadMoviesSuccess, AddMovie, AddMovieSuccess } from '../actions/movie.actions';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie.model';



@Injectable()
export class MovieEffects {


  @Effect()
  loadMovies$ = this.actions$.pipe(
    ofType(MovieActionTypes.LoadMovies),
    mergeMap(() => this.movieService.getMovies().pipe(
      map((response: Movie[]) => new LoadMoviesSuccess({ movies: response }))
    ))
  );

  @Effect()
  addMovie$ = this.actions$.pipe(
    ofType(MovieActionTypes.AddMovie),
    mergeMap((action: AddMovie) => this.movieService.createMovie(action.payload.movie).pipe(
      map((response: Movie) => new AddMovieSuccess({ movie: response }))
    ))
  );


  constructor(private actions$: Actions<MovieActions>, private movieService: MovieService) {}

}
