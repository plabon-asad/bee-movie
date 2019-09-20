import {Injectable} from '@angular/core';
/**
 * New module
 */
import {HttpClient} from '@angular/common/http';
import {Jsonp} from '@angular/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  swapiUrl = 'https://swapi.co/api/';

  constructor(
    private http: HttpClient, jsonp: Jsonp
  ) {
  }

  /**
   * Add page value url param
   */
  getByPage(page: number): string {
    if (page) {
      return '&page=' + page;
    } else {
      return '';
    }
  }

  /**
   * Return list of films as observable
   */
  public getFilms(page = 0): Observable<any> {
    return this.http.get(`${this.swapiUrl}films?format=json${this.getByPage(page)}`);
  }

  /**
   * Return film by id
   */
  public getFilm(id: number): Observable<any> {
    console.log('Receiver Id', id);
    return this.http.get(`${this.swapiUrl}films/${id}?format=json`);
  }

  /**
   * Search films by title
   */
  public searchFilms(title: string): Observable<any> {
    console.log('Search params', title);
    return this.http.get(`${this.swapiUrl}films?search=${title}`);
  }

  /**
   * Return list of starships
   */
  public getStarships(page?: number): Observable<any> {
    return this.http.get(`${this.swapiUrl}starships?format=json${this.getByPage(page)}`);
  }

  /**
   * Return starship by id
   */
  public getStarship(id: number): Observable<any> {
    return this.http.get(`${this.swapiUrl}starships/${id}?format=json`);
  }

  /**
   * Search starships by name
   */
  public searchStarships(name: string): Observable<any> {
    return this.http.get(`${this.swapiUrl}starships?search=${name}`);
  }

  /**
   * Local storage set method to set favorite-data
   */
  setFavoriteData(id, data) {
    localStorage.setItem(`favorite_data_${id}`, JSON.stringify(data));
  }

  /**
   * Local storage get method to catch favorite-data
   */
  removeFavoriteData(key_id) {
    localStorage.removeItem(`favorite_data_${key_id}`);
  }

  getCharacter(url): Observable<any> {
    return this.http.get(url);
  }

  /**
   * Get all data of Local storage
   */
  getAllStorage() {
    const values = [], keys = Object.keys(localStorage);
    let i = keys.length;
    while (i--) {
      values.push( JSON.parse(localStorage.getItem(keys[i])) );
    }
    return values;
  }

}
