import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../components/login/login.component';
//import { LoginComponent } from '../components/login/login.component';
import { BehaviorSubject } from 'rxjs';
import { User } from '../module/user';
import { Favorites } from '../module/favorites';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    if (this.token) {
      this.isLoggedInSubject.next(true);
    }
  }
  apiUrl = environment.apiUrl;
  apiLogin = environment.apiLogin;
  apiRe = environment.apiReg;
  apigetpre = environment.apiGetFavorites;
  apipostpref = environment.apiPost;
  token: string | null = localStorage.getItem('authToken');

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  login() {
    const token = 'il_tuo_token_di_accesso';
    localStorage.setItem('authToken', token);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIN(): boolean {
    return this.isLoggedInSubject.value;
  }

  getIsLoggedInObservable(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  signin(data: { name: string; email: string; password: string }) {
    return this.http.post(this.apiRe, data);
  }

  logIN(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiLogin, data);
  }

  addPreferiti(
    userId: number,
    movieId: number,
    movieImg: string
  ): Observable<any> {
    const filmPreferiti: Favorites = {
      userId: userId,
      movieId: movieId,
      movieImg: movieImg,
    };
    console.log(filmPreferiti);
    console.log(filmPreferiti + 'ciao');
    return this.http.post<Favorites>(this.apipostpref, filmPreferiti);
  }

  removePreferiti(id: number) {
    return this.http.delete<any>(`http://localhost:4201/favorites/${id}`);
  }

  getuserID(): any {
    const user = localStorage.getItem('user');
    if (user) {
      const userInfo: User = JSON.parse(user);
      return userInfo.user.id;
    }
  }

  getFavoritesByUserId(userId: number): Observable<Favorites[]> {
    return this.http.get<Favorites[]>(this.apigetpre + `${userId}`);
  }

  getname() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userInfo = JSON.parse(userString);
      return userInfo.user.name;
    } else {
      return null;
    }
  }

  getEmail() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userInfo = JSON.parse(userString);
      return userInfo.user.email;
    } else {
      return null;
    }
  }
}
