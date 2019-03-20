import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import * as fromStore from '../reducers/movie.reducer';
import { LoadMovies } from '../actions/movie.actions';

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

}
