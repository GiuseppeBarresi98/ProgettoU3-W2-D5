import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private srv: AuthService) {}
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.srv.getIsLoggedInObservable().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log(isLoggedIn);
    });
  }

  getlogOut() {
    this.srv.logout();
    alert('logOut effettuato');
  }
}
