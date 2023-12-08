import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/module/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  newUser = {
    name: '',
    email: '',
    password: '',
  };

  ngOnInit(): void {}

  onSubmit() {
    this.authService.signin(this.newUser).subscribe(
      (data) => {
        console.log('Registrazione avvenuta con successo', data);
        alert('Registrazione avvenuta con successo');
        this.resetForm();

        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Errore durante la registrazione', error);
      }
    );
  }
  resetForm() {
    this.newUser = {
      name: '',
      email: '',
      password: '',
    };
  }
}
