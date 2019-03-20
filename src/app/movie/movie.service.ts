import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './models/movie.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  public getMovies = (): Observable<Movie[]> => this.http.get<Movie[]>(`${environment.apiUrl}/movies`);
  public createMovie = (request: Partial<Movie>): Observable<Movie> => this.http.post<Movie>(`${environment.apiUrl}/movies`, request);
}
