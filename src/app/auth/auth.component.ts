import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Category } from '../models/category.model';
import { UtilsService } from '../services/utils.service';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../app.module';
import { Vinyl } from '../models/vinyl.model';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  selectedFile: any = null;
  pdf: any = null;
  imgUrl: string = '';
  vinylUrl: string = '';
  id!: number;
  vinylData: Vinyl[] = [];
  vinylForm: FormGroup;
  updateUrl: boolean = false;
  constructor(
    private router: Router,
    private builder: FormBuilder,
    private api: ApiService,
    private utils: UtilsService,
    private fb: FormBuilder,
    private snackBar: UtilsService
  ) {
    this.vinylForm = fb.group({
      vinyl: new FormControl(''),
    });
  }
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

  async ngOnInit() {
    this.vinylData = await this.api.getVinyl();
    this.vinylData.forEach((value) => {
     if(value) {
      this.imgUrl = value.vinyl;
      this.id = value.id;
     }
    })
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
      this.loader = true;
      this.api.loginEmployee(this.loginForm.value).subscribe(
        (res: any) => {
          // this.loader = true;
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

  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgUrl = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
      this.updateUrl = true;
      console.log(this.updateUrl);
      this.vinylUpload();
    } else {
      this.selectedFile = null;
      this.imgUrl = '';
    }
  }

  async uploadAndGetDownloadUrl(): Promise<string> {
    const reference = ref(storage, 'restaurant');
    await uploadBytes(reference, this.selectedFile);
    return await getDownloadURL(ref(storage, 'restaurant'));
  }

  async vinylUpload() {
    if (this.updateUrl == true) {
      this.vinylUrl = await this.uploadAndGetDownloadUrl();
    } else {
      this.vinylUrl = this.vinylData[0].vinyl;
    }
    if(this.vinylData.length > 0){
      await this.api.updateVinyl(this.id, {
        vinyl: this.vinylUrl,
     });
     this.snackBar.openSnackBar('Poster updated successful!');
    }else {
      await this.api.postVinyl({ vinyl: this.vinylUrl });
      this.snackBar.openSnackBar('Poster created successful!');
    }
  }

  back() {
    this.selectedRole = false;
  }

}
