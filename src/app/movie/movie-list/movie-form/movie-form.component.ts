import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromMovie from '../../reducers/movie.reducer';
import { AddMovie } from '../../actions/movie.actions';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieFormComponent implements OnInit {
  movieFormGroup: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    year: new FormControl(null, Validators.required)
  });

  constructor(private store: Store<fromMovie.MovieState>) { }

  ngOnInit() {
  }

  public save(): void {
    this.store.dispatch(new AddMovie({ movie: this.movieFormGroup.value }));
  }
}
