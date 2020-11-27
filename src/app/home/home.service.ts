import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Film } from '../typings/film.type';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  fetchFilm() {
    return this.http.get(`${environment.API_URL}/film`);
  }

  createFilm(film: Film) {
    return this.http.post(`${environment.API_URL}/film`, film);
  }

  updateFilm(film) {
    return this.http.put(`${environment.API_URL}/film/${film._id}`, film);
  }
}
