import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, ActionsSubject, Action } from '@ngrx/store';
import * as fromMovie from '../../reducers/movie.reducer';
import { AddMovie, MovieActionTypes, SelectMovie, UpdateMovie } from '../../actions/movie.actions';
import { Observable, Subscription } from 'rxjs';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieFormComponent implements OnInit, OnDestroy {
  private actionsSubjectSubscription: Subscription;
  movieFormGroup: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    year: new FormControl(null, Validators.required)
  });
  selectedMovie: Movie | null;
  movies$: Observable<Movie[]>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<fromMovie.MovieState>,
    private actionsSubject: ActionsSubject
  ) { }

  ngOnInit(): void {
    this.movies$ = this.store.select(fromMovie.selectAll);
    this.actionsSubjectSubscription = this.actionsSubject.subscribe((action: Action) => {
      switch (action.type) {
        case MovieActionTypes.AddMovieSuccess: this.movieFormGroup.reset(); return;
        case MovieActionTypes.SelectMovie: this.setSelectedMovie((action as SelectMovie).payload.movie); return;
      }
    });
  }

  ngOnDestroy(): void {
    this.actionsSubjectSubscription.unsubscribe();
  }

  private setSelectedMovie(selectedMovie: Movie | null): void {
    this.selectedMovie = selectedMovie;
    if (this.selectedMovie) {
      this.movieFormGroup.patchValue(selectedMovie);
      this.changeDetectorRef.detectChanges();
    } else {
      this.movieFormGroup.reset();
    }
  }

  public save(): void {
    if (this.selectedMovie) {
      this.store.dispatch(new UpdateMovie({ id: this.selectedMovie.id, movie: this.movieFormGroup.value }));
    } else {
      this.store.dispatch(new AddMovie({ movie: this.movieFormGroup.value }));
    }
  }

  public cancelUpdate(): void {
    this.store.dispatch(new SelectMovie({ movie: null }));
  }

  public isExistingMovieName(movies: Movie[]): boolean {
    return !!movies.find((movie: Movie) => movie.title === this.movieFormGroup.get('title').value);
  }
}
