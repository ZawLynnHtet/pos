import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-new-staff',
  templateUrl: './add-new-staff.component.html',
  styleUrls: ['./add-new-staff.component.css']
})
export class AddNewStaffComponent {
  staffData = {
    profilePicture: null,
    name: '',
    role: '',
    phone: '',
    email: '',
    password: '',
    username: '',
    address: ''


  }
  constructor(private http: HttpClient) { }
  register() {
    const formData = new FormData();
    formData.append('profilePicture', this.staffData.profilePicture!);
    formData.append('name', this.staffData.name);
    formData.append('username', this.staffData.username);
    formData.append('email', this.staffData.email);
    formData.append('password', this.staffData.password);
    formData.append('phone', this.staffData.phone);
    formData.append('role', this.staffData.role);
    formData.append('address', this.staffData.address);


    this.http.post('/api/v1/register', formData).subscribe((response: any) => {
      alert('Registration successful');
    }
    )


  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.staffData.profilePicture = file;
    }
  }

}
