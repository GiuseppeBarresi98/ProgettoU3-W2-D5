import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    FavoritesComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
