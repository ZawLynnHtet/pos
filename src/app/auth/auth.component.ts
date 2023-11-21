import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Employee } from '../models/employee.model';
import { Category } from '../models/category.model';
import { ExtraFood } from '../models/extrafood.model';
import { Menu } from '../models/menu.model';

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
  employees: Employee[] = [];
  loader: boolean = false;

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
    // this.getEmployeeData();
  }

  registration() {
    if (this.registerForm.valid) {
      this.loader = true;
      this.api.registerEmployee(this.registerForm.value).subscribe((res) => {
        this.router.navigateByUrl('tables');
      });
      let data = {
        role: this.registerForm.value.role,
        name: this.registerForm.value.name,
      };
      localStorage.setItem('data', JSON.stringify(data));
    } else {
      console.warn('Please enter the required!');
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.loader = true;
      this.api.loginEmployee(this.loginForm.value).subscribe((res) => {
        this.router.navigateByUrl('tables');
      });
      for (let i = 0; i < this.employees.length; i++) {
        if (this.loginForm.value.email == this.employees[i].email) {
          let data = {
            role: this.employees[i].role,
            name: this.employees[i].name,
          };
          localStorage.setItem('data', JSON.stringify(data));
          console.log(this.employees[i].role);
          break;
        }
      }
      this.getCategoriesAndExtraFoodsAndMenusAndStoreInLocalStorage();
    } else {
      console.warn('Please enter the required!');
    }
  }

  // async getEmployeeData() {
  //   this.employees = await this.api.getEmployee();
  // }

  signInOrUp() {
    this.sign_in = !this.sign_in;
  }

  async getCategoriesAndExtraFoodsAndMenusAndStoreInLocalStorage() {
    const categories: Category[] = await this.api.getAllCategories();
    localStorage.setItem('categories', JSON.stringify(categories));
    const extraFoods: ExtraFood[] = await this.api.getAllExtraFoods();
    localStorage.setItem('extraFoods', JSON.stringify(extraFoods));
    const menuNames: Menu[] = await this.api.getAllFoodNames();
    localStorage.setItem('menuNames', JSON.stringify(menuNames));

    const waitstaffs: Employee[] = await this.api.getEmployeesWithRole(
      'waiter'
    );
    localStorage.setItem('waitstaffs', JSON.stringify(waitstaffs));

    const supervisors: Employee[] = await this.api.getEmployeesWithRole(
      'supervisor'
    );
    localStorage.setItem('supervisors', JSON.stringify(supervisors));
  }
}
