import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import { Routes, RouterModule } from  '@angular/router';

/* for routing */
import { Routing } from './app.routes';

/* Toaster */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


/* Angular Module */
import {FormsModule} from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {JsonpModule} from '@angular/http';

/* Service */
import {SwapiService} from './services/swapi.service';

/* Component */
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { HomeComponent } from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    AppLayoutComponent,
    HomeComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule, Routing,
    FormsModule, HttpClientModule, HttpClientJsonpModule,
    JsonpModule, BrowserAnimationsModule, ToastrModule.forRoot()
  ],
  providers: [
    SwapiService
  ],
  bootstrap: [AppComponent],
  // exports: [RouterModule]
})
export class AppModule {
}
