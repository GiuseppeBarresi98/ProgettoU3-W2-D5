import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Movies } from 'src/app/module/movies';
import { Observable } from 'rxjs';
import { Favorites } from 'src/app/module/favorites';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: Movies[] = [];
  userid: number = 0;
  userName!: string;

  constructor(private srv: AuthService) {}

  ngOnInit(): void {
    this.userName = this.srv.getname();
    if (this.userName !== null && this.userName !== undefined) {
      console.log('Valore di userName:', this.userName);
    } else {
      console.error('Valore di userName non valido:', this.userName);
    }

    console.log(this.userName);
    this.loadMovies();
    console.log(this.movies);
    this.userid = this.srv.getuserID();
  }

  loadMovies() {
    this.srv.getMovies().subscribe(
      (popularMovies: any[]) => {
        this.movies = popularMovies;
      },
      (error) => {
        console.error('Errore durante il recupero dei film:', error);
      }
    );
  }
  aggiungiPreferiti(movieId: number, movieImg: string) {
    this.srv
      .addPreferiti(this.userid, movieId, movieImg)
      .subscribe((moviepref: Favorites) => {
        console.log(movieId);
      });
    alert('Film aggiunto ai preferiti!');
  }

  removepref(movieId: number) {
    this.srv.removePreferiti(movieId);
  }
}
