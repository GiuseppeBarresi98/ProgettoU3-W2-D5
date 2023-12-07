import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Movies } from 'src/app/module/movies';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: Movies[] = [];

  constructor(private srv: AuthService) {}

  ngOnInit(): void {
    this.loadMovies();
    console.log(this.movies);
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
}
