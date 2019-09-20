import {Component, OnInit} from '@angular/core';
import {SwapiService} from '../services/swapi.service';
import {HelperService} from '../services/helper.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  films = [];
  search_film = '';
  data_not_found = false;
  favorite_data = [];

  constructor(
    private swapiService: SwapiService, private helperSrvc: HelperService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.loadFilms();
    // this.tooTip();
  }

  loadFilms() {
    this.swapiService.getFilms().subscribe(
      res => {
        this.films = res.results;
        this.favorite_data = this.helperSrvc.loadLocalStorageData();
        if (this.favorite_data.length > 0) {
          for (let i = 0; this.films.length > i; i++) {
            let film = this.films[i];
            film['flag'] = false;
            let film_data_id = film.url.slice(-2, -1);
            for (let fav of this.favorite_data) {
              let fav_data_id = fav.url.slice(-2, -1);
              // console.log('fav_data_id', fav_data_id);
              if (film_data_id === fav_data_id) {
                film['flag'] = true;
              }
              this.films[i] = film;
              // console.log('films', this.films);
            }
          }

        }


      },
      err => {
        console.log(err);
      });
  }

  filmUrl(film) {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');
    let title = film.title;
    let slug = title.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
    return film.url.slice(-2, -1) + '/' + slug;
  }

  searchFilm() {
    this.swapiService.searchFilms(this.search_film).subscribe(
      resp => {
        if (resp.count > 0) {
          this.films = resp.results;
          this.data_not_found = false;
        } else {
          this.films = [];
          this.data_not_found = true;
        }
        console.log('Search Result', resp);
      },
      err => {
        console.log(err);
      }
    );
  }

  clearSearch() {
    this.search_film = '';
    this.loadFilms();
    this.data_not_found = false;
  }

  addFavorite(film) {
    const id = film.url.slice(-2, -1);
    this.swapiService.setFavoriteData(id, film);
    for (let i = 0; this.films.length > i; i++) {
      let film_data_id = this.films[i].url.slice(-2, -1);
      if( id === film_data_id ) {
        this.films[i].flag = true;
        break;
      }
    }
    this.helperSrvc.presenToast('Favorite', 'Successfully added.');
  }

  removeFavorite(film) {
    const id = film.url.slice(-2, -1);
    this.swapiService.removeFavoriteData(id);
    for (let i = 0; this.films.length > i; i++) {
      let film_data_id = this.films[i].url.slice(-2, -1);
      if( id === film_data_id ) {
        this.films[i].flag = false;
        break;
      }
    }
    this.helperSrvc.presenToast('Favorite', 'Successfully remove.');
  }

  showSuccess() {
    this.helperSrvc.presenToast('Asad', 'Hello');
  }


}
