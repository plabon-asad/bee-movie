import {Component, OnInit} from '@angular/core';

/* New module */
import {ActivatedRoute} from '@angular/router';

/* Service */
import {SwapiService} from '../services/swapi.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  receiver_id = '';
  film: any;
  characters = [];

  constructor(
    private swapiService: SwapiService, private activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        this.receiver_id = params['id'];
        this.loadFilm(this.receiver_id);
      }
    );
  }

  loadFilm(id) {
    this.swapiService.getFilm(id).subscribe(
      res => {
        this.film = res;
        this.loadCharecters(this.film);
        console.log('Movie details', res);
      },
      err => {
        console.log(err);
      });
  }

  loadCharecters(film) {
    let characters = film.characters;
    for (let i in characters) {
      this.loadCharacter(characters[i]);
    }
  }

  loadCharacter(url) {
    this.swapiService.getCharacter(url).subscribe(
      resp => {
        this.characters.push(resp);
      },
      err => {
        console.log(err);
      });
  }

}
