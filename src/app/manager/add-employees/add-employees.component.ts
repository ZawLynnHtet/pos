import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css'],
})
export class AddEmployeesComponent {
  selectedFile?: ImageSnippet;

  constructor(private builder: FormBuilder) {}

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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile);
    });

    reader.readAsDataURL(file);
  }
}
