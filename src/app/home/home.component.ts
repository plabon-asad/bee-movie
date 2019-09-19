import {Component, OnInit} from '@angular/core';
import {SwapiService} from '../services/swapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  films = [];
  search_film = '';
  data_not_found = false;

  constructor(
    private swapiService: SwapiService
  ) {
  }

  ngOnInit() {
    this.loadFilms();
  }

  loadFilms() {
    this.swapiService.getFilms().subscribe(
      res => {
        this.films = res.results;
        console.log(res);
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
  }

  removeFavorite(film) {
    const id = film.url.slice(-2, -1);
    this.swapiService.removeFavoriteData(id);
  }

}
