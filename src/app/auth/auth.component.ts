import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Employees } from '../models/waiter.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private router: Router,
    private builder: FormBuilder,
    private api: ApiService
  ) {}
  sign_in: boolean = false;
  employees: Employees[] = [];

  registerForm = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
    phone: this.builder.control('', [Validators.required]),
    name: this.builder.control('', Validators.required),
    gender: this.builder.control(''),
    role: this.builder.control('', [Validators.required]),
    // password: this.builder.control(
    //   '',
    //   Validators.compose([
    //     Validators.required,
    //     Validators.pattern(
    //       '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}'
    //     ),
    //   ])
    // ),
    password: this.builder.control('', [Validators.required]),
  });

  loginForm = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
    password: this.builder.control('', [Validators.required]),
  });

  genders = ['male', 'female'];

  ngOnInit(): void {
    this.getEmployeeData();
  }

  registration() {
    if (this.registerForm.valid) {
      this.api.registerEmployee(this.registerForm.value).subscribe((res) => {
        this.router.navigateByUrl('tables');
        console.log(res);
      });
      for (let i = 0; i < this.employees.length; i++) {
        localStorage.setItem('role', this.employees[i].role);
        console.log(this.employees[i].role);
      }
    } else {
      console.warn('Please enter the required!');
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.api.loginEmployee(this.loginForm.value).subscribe((res) => {
        this.router.navigateByUrl('tables');
        console.log(res);
      });
      for (let i = 0; i < this.employees.length; i++) {
        localStorage.setItem('role', this.employees[i].role);
        console.log(this.employees[i].role);
      }
    } else {
      console.warn('Please enter the required!');
    }
  }

  async getEmployeeData() {
    this.employees = await this.api.getEmployee();
    console.log(this.employees);
  }

  signInOrUp() {
    this.sign_in = !this.sign_in;
  }
}
