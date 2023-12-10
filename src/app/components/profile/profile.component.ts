import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private srv: AuthService) {}
  username!: string;
  email!: string;

  ngOnInit(): void {
    this.username = this.srv.getname();
    this.email = this.srv.getEmail();
  }
}
