import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Employee } from '../models/employee.model';
import { Category } from '../models/category.model';
import { ExtraFood } from '../models/extrafood.model';
import { Menu } from '../models/menu.model';
import { UtilsService } from '../services/utils.service';
import { Ingredient } from '../models/ingredient.model';

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

  ngOnInit(): void {
    // this.getEmployeeData();
  }

  registration() {
    if (this.registerForm.valid) {
      this.loader = true;
      this.api
        .registerEmployee(this.registerForm.value)
        .subscribe((res: any) => {
          let data = {
            id: res.user.employee_id,
            role: res.user.role,
            name: res.user.name,
          };
          localStorage.setItem('data', JSON.stringify(data));
          this.router.navigateByUrl('tables');
        });
    } else {
      console.warn('Please enter the required!');
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.loader = true;
      this.api.loginEmployee(this.loginForm.value).subscribe((res: any) => {
        let data = {
          id: res.user.employee_id,
          role: res.user.role,
          name: res.user.name,
        };
        localStorage.setItem('data', JSON.stringify(data));

        this.router.navigateByUrl('tables');
      });
      this.callApiAndStoreResponseInLocalStorage();
    } else {
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
}
