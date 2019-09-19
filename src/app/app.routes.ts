import {Routes, RouterModule} from '@angular/router';

import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {AppLayoutComponent} from './app-layout/app-layout.component';
import {HomeComponent} from './home/home.component';
import {FavoriteComponent} from './favorite/favorite.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: ':id/:slug', component: MovieDetailsComponent},
      {path: 'favorite', component: FavoriteComponent},
    ]
  }
];

export const Routing = RouterModule.forRoot(routes);
