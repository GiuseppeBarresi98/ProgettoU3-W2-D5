import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Observable } from 'rxjs';
import { Favorites } from 'src/app/module/favorites';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(private srv: AuthService) {}
  favorites: any = [];

  ngOnInit(): void {
    const userId = this.srv.getuserID();

    if (userId !== null) {
      this.srv.getFavoritesByUserId(userId).subscribe(
        (data) => {
          this.favorites = data;
          console.log('Film preferiti:', this.favorites);
        },
        (error) => {
          console.error(
            'Errore durante il recupero dei film preferiti:',
            error
          );
        }
      );
    } else {
      console.error("ID dell'utente non disponibile");
    }
  }

  removepref(film: any) {
    const filmIdToRemove = film.id;
    this.srv.removePreferiti(filmIdToRemove).subscribe(
      () => {
        console.log('Film preferito rimosso con successo');

        const userId = this.srv.getuserID();
        this.srv.getFavoritesByUserId(userId).subscribe(
          (data) => {
            this.favorites = data;
            console.log('Film preferiti aggiornati:', this.favorites);
          },
          (error) => {
            console.error(
              "Errore durante l'aggiornamento dei film preferiti:",
              error
            );
          }
        );
      },
      (error) => {
        console.error('Errore durante la rimozione del film preferito:', error);
      }
    );
  }
}
