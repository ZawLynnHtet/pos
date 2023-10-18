import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private router: Router) {}
  role: string = '';
  sign_in: boolean = false;

  login() {
    localStorage.setItem('role', this.role);
    this.router.navigateByUrl('tables');
  }

  signInOrUp() {
    this.sign_in = !this.sign_in;
  }
}
