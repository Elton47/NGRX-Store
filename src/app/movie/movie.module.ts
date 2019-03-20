import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromMovie from './reducers/movie.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './effects/movie.effects';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieFormComponent } from './movie-list/movie-form/movie-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieFormComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('movie', fromMovie.reducer),
    EffectsModule.forFeature([MovieEffects])
  ]
})
export class MovieModule { }
