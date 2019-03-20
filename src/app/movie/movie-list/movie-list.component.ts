import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import * as fromStore from '../reducers/movie.reducer';
import { LoadMovies, DeleteMovie, SelectMovie } from '../actions/movie.actions';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private store: Store<fromStore.MovieState>) { }

  ngOnInit() {
    this.movies$ = this.store.select(fromStore.selectAll);
    this.store.dispatch(new LoadMovies());
  }

  public updateMovie(movie: Movie): void {
    this.store.dispatch(new SelectMovie({ movie }));
  }

  public deleteMovie(event: MouseEvent, movie: Movie): void {
    event.stopPropagation();
    if (confirm(`Delete "${movie.title} (${movie.year})" movie?`)) {
      this.store.dispatch(new DeleteMovie({ id: movie.id }));
    }
  }
}
