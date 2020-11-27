import { Component } from '@angular/core';
import { FILMS } from '../mooks/films';
import { Film } from '../typings/film.type';
import { StorageService } from '../shared/services/storage.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  films;
  newFilm: Film = { title: "", description: "", dateSortie: new Date() };
  constructor(
    private storageService: StorageService,
    private homeService: HomeService,
  ) {
    this.fetchFilm();
  }

  removeFilm(index: number) {
    this.films.splice(index, 1);
    this.saveFilms();
  }

  addFilm() {
    const film: Film = { title: "", description: "", dateSortie: new Date()};
    Object.assign(film, this.newFilm);
    this.homeService.createFilm(film).subscribe(
      (film) => {
        this.films.unshift(film);
      }
    )
    Object.assign(this.newFilm, { title: "", description: "", dateSortie: new Date() });
  }

  setInUpdate(film: Film, inUpdate: boolean) {
    film.inUpdate = inUpdate;
    if(inUpdate) {
      return;
    }
    this.homeService.updateFilm(film).subscribe(
      (result) => {
        alert('Success');
      }
    )
  }

  saveFilms() {
    this.storageService.setItem('films', this.films);
  }

  fetchFilm() {
    this.homeService.fetchFilm().subscribe(
      (films) => {
        this.films = films;
        console.log('film ',this.films)
      }
    )
  }
}
