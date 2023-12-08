import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../components/login/login.component';
//import { LoginComponent } from '../components/login/login.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  apiLogin = environment.apiLogin;
  apiRe = environment.apiReg;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  login() {
    this.isLoggedInSubject.next(true);
  }

  logout() {
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

  isLogged() {}
}
