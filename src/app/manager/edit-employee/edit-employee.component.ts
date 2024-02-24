import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/app/app.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  roles: string[] = ['waiter', 'supervisor'];
  genders: string[] = ['female', 'male'];
  hide = true;
  employeeForm: FormGroup;
  selectedFile: any = null;
  imgUrl: string = '..//..//../assets/images/profile.png';

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: UtilsService
  ) {
    this.employeeForm = fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      role: new FormControl(''),
      gender: new FormControl(''),
      password: new FormControl(''),
      img: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
    if (this.employeeForm.value.img) {
      this.imgUrl = this.employeeForm.value.img;
    } else {
      this.imgUrl = '..//..//../assets/images/profile.png';
    }
  }

  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgUrl = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
      this.imgUrl = '..//..//../assets/images/profile.png';
    }
  }

  async uploadAndGetDownloadUrl(name: string): Promise<string> {
    const reference = ref(storage, `employees/${this.employeeForm.value.name}`);
    await uploadBytes(reference, this.selectedFile);
    return await getDownloadURL(ref(storage, `employees/${name}`));
  }

  async FormSubmit() {
    const url = await this.uploadAndGetDownloadUrl(
      this.employeeForm.value.name!
    );
    console.log(url);

    const employeeData: Employee = {
      name: this.employeeForm.value.name,
      email: this.employeeForm.value.email,
      phone: this.employeeForm.value.phone,
      role: this.employeeForm.value.role,
      gender: this.employeeForm.value.gender,
      password: this.employeeForm.value.password,
      img: url,
    };
    if (this.employeeForm.valid) {
      if (this.data) {
        this.api.updateEmployee(this.data.employee_id, employeeData);
        this.snackBar.openSnackBar('Employee updated successful!');
        this.dialogRef.close(true);
      } else {
        this.api.postEmployee(employeeData);
        this.snackBar.openSnackBar('Employee added successful!');
        this.dialogRef.close(true);
      }
    } else {
      console.log('Invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
