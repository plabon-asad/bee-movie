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
        console.log('Movie details', res);
      },
      err => {
        console.log(err);
      });
  }

  loadCharecter() {

  }

}
