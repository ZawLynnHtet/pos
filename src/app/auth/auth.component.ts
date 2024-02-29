import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Employee } from '../models/employee.model';
import { Category } from '../models/category.model';
import { ExtraFood } from '../models/extrafood.model';
import { Menu } from '../models/menu.model';
import { UtilsService } from '../services/utils.service';
import { Ingredient } from '../models/ingredient.model';
import { Table } from '../models/table.model';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private router: Router,
    private builder: FormBuilder,
    private api: ApiService,
    private utils: UtilsService
  ) {}
  sign_in: boolean = false;
  loader: boolean = false;
  errorMessage: string = '';
  selectedRole: boolean = false;
  userRole: string = '';
  manager: boolean = false;
  roles = ['Manager', 'Supervisor', 'Waiter'];
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
    //       '(?=[^A-Z][A-Z])(?=[^a-z][a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}'
    //     ),
    //   ])
    // ),
    password: this.builder.control('', [Validators.required]),
  });
  loginForm = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
    password: this.builder.control('', [Validators.required]),
  });

  ngOnInit(): void {
    // this.getEmployeeData();
  }

  registration() {
    console.log('clicked');
    if (this.registerForm.valid) {
      this.loader = true;
      this.api.registerEmployee(this.registerForm.value).subscribe(
        (res: any) => {
          let data = {
            id: res.user.employee_id,
            role: res.user.role,
            name: res.user.name,
          };
          localStorage.setItem('data', JSON.stringify(data));
          if (res.user.role === 'manager') {
            this.router.navigateByUrl('dashboard');
          } else {
            this.router.navigateByUrl('tables');
          }
        },
        (error: any) => {
          this.loader = false;
          if (
            error.status === 400 &&
            error.error === 'Email is already associated with an account'
          ) {
            this.errorMessage = 'Email has already registered!';
          } else {
            this.loader = false;
            this.errorMessage =
              'An error occurred during register. Please try again later.';
            console.error('An error occurred during login:', error);
          }
        }
      );
      this.callApiAndStoreResponseInLocalStorage();
    } else {
      this.loader = false;
      this.errorMessage = 'Please Enter the required!';
      console.warn('Please enter the required!');
    }
  }

  login() {
    if (this.loginForm.valid) {
      // this.loader = true;
      this.api.loginEmployee(this.loginForm.value).subscribe(
        (res: any) => {
          this.loader = true;
          let data = {
            id: res.user.employee_id,
            role: res.user.role,
            name: res.user.name,
          };
          localStorage.setItem('data', JSON.stringify(data));
          if (res.user.role === 'manager') {
            this.router.navigateByUrl('dashboard');
          } else {
            this.router.navigateByUrl('tables');
          }
        },
        (error: any) => {
          this.loader = false;
          if (error.status === 404 && error.error === 'Email not found') {
            this.errorMessage =
              'Email not found. Please check your email and try again.';
            console.warn(
              'Email not found. Please check your email and try again.'
            );
          } else if (
            error.status === 404 &&
            error.error === 'Incorrect email and password combination'
          ) {
            this.errorMessage = 'Email and Password Do Not Match';
          } else {
            this.loader = false;
            this.errorMessage =
              'An error occurred during login. Please try again later.';
            console.error('An error occurred during login:', error);
          }
        }
      );
      this.callApiAndStoreResponseInLocalStorage();
    } else {
      this.markFormGroupTouched(this.loginForm);
      console.warn('Please enter the required!');
    }
  }
  signInOrUp() {
    this.sign_in = !this.sign_in;
  }
  async callApiAndStoreResponseInLocalStorage() {
    const categories: Category[] = await this.api.getAllCategories();
    localStorage.setItem('categories', JSON.stringify(categories));
    const extraFoods: ExtraFood[] = await this.api.getAllExtraFoods();
    localStorage.setItem('extraFoods', JSON.stringify(extraFoods));
    const menuNames: Menu[] = await this.api.getAllFoodNames();
    localStorage.setItem('menuNames', JSON.stringify(menuNames));
    const ingredients: Ingredient[] = await this.api.getAllIngredient();
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
    const waitstaffs: Employee[] = await this.api.getEmployeesWithRole(
      'waiter'
    );
    localStorage.setItem('waitstaffs', JSON.stringify(waitstaffs));
    const supervisors: Employee[] = await this.api.getEmployeesWithRole(
      'supervisor'
    );
    localStorage.setItem('supervisors', JSON.stringify(supervisors));
  }
  ngOnDestroy() {
    this.api.unsubscribe();
  }
  markFormGroupTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  click(role: string) {
    this.selectedRole = true;
    if (role === 'Manager') {
      this.manager = true;
    } else {
      this.manager = false;
    }
  }

  back() {
    this.selectedRole = false;
  }
}
