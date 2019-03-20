import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Store, ActionsSubject, Action } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Movie } from '../models/movie.model';
import * as fromStore from '../reducers/movie.reducer';
import { LoadMovies, DeleteMovie, SelectMovie, MovieActionTypes } from '../actions/movie.actions';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit, OnDestroy {
  private actionsSubjectSubscription: Subscription;
  movies$: Observable<Movie[]>;

  constructor(
    private store: Store<fromStore.MovieState>,
    private actionsSubject: ActionsSubject
  ) { }

  ngOnInit(): void {
    this.movies$ = this.store.select(fromStore.selectAll);
    this.store.dispatch(new LoadMovies());
    this.actionsSubjectSubscription = this.actionsSubject.subscribe((action: Action) => {
      switch (action.type) {
        case MovieActionTypes.DeleteMovieSuccess: this.store.dispatch(new SelectMovie({ movie: null })); return;
      }
    });
  }

  ngOnDestroy(): void {
    this.actionsSubjectSubscription.unsubscribe();
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
