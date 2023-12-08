import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
      //isLogged: this.isLogged,
    };

    this.authService.logIN(loginData).subscribe(
      (data) => {
        console.log('Login avvenuto con successo', data);
        alert('login effettuato');
        this.authService.login();
        //this.authService.logV = true;
        //this.isLogged = true;
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Errore durante il login', error);
        alert('Password errata o mancante');
      }
    );
  }
}
