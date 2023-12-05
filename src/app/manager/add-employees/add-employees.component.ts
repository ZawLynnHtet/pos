import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/app/app.module';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css'],
})
export class AddEmployeesComponent implements OnInit {
  selectedFile?: ImageSnippet;
  genders: any[] = ['Male', 'Female'];

  constructor(private builder: FormBuilder) {}

  registerForm: FormGroup = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
    phone: this.builder.control('', [Validators.required]),
    name: this.builder.control('', [Validators.required]),
    gender: this.builder.control('', [Validators.required]),
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
    password: this.builder.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]),
  });

  ngOnInit(): void {
    // async uploadAndGetDownloadUrl(name: string): Promise<string> {
    //   const reference = ref(storage, `menus/${this.menuForm.value.foodName}`);
    //   await uploadBytes(reference, this.selectedFile?.file!);
    //   return await getDownloadURL(ref(storage, `menus/${name}`));
    // }
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile);
    });

    reader.readAsDataURL(file);
  }

  createEmployee() {
    const employee: Employee = {
      // employee_id: ;
      name: this.registerForm.controls['name'].value,
      email: this.registerForm.controls['email'].value,
      phone: this.registerForm.controls['phone'].value,
      gender: this.registerForm.controls['gender'].value,
      role: this.registerForm.controls['role'].value!,
      password: this.registerForm.controls['password'].value!,
    };

    console.log(employee);
  }
}
