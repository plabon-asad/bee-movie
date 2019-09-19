import {Component, OnInit} from '@angular/core';
/**
 * Service
 */
import {SwapiService} from '../services/swapi.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favorite_data = [];

  constructor(
    private swapiService: SwapiService
  ) {
  }

  ngOnInit() {
    this.load();
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

  load() {
    this.favorite_data = this.swapiService.getAllStorage();
    console.log('Fav data', this.favorite_data);
  }

  removeFavorite(film) {
    const id = film.url.slice(-2, -1);
    this.swapiService.removeFavoriteData(id);
    this.load();
  }

}
