import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './models/movie.model';
import { environment } from '../../environments/environment';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  public loadMovies = (): Observable<Movie[]> => this.http.get<Movie[]>(`${environment.apiUrl}/movies`);
  public addMovie = (request: Partial<Movie>): Observable<Movie> => this.http.post<Movie>(`${environment.apiUrl}/movies`, request);
  public updateMovie = (id: string, request: Partial<Movie>): Observable<Movie> => this.http.put<Movie>(`${environment.apiUrl}/movies/${id}`, request);
  public deleteMovie = (id: string): Observable<void> => this.http.delete<void>(`${environment.apiUrl}/movies/${id}`);
}
