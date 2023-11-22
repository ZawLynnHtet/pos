import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient) {}

  getStaffByRole(role: string) {
    return this.http.get(`/api/v1/staffs/${role}`);
  }

  getTotalStaffCount() {
    return this.http.get('/api/v1/staffs/count');
  }

  getStaffById(id: string) {
    return this.http.get(`/api/v1/staffs/${id}`);
  }

  deleteStaffById(id: string) {
    return this.http.delete(`/api/v1/staffs/${id}`);
  }

  updateStaffById(id: string, staffData: any) {
    return this.http.patch(`/api/v1/staffs/${id}`, staffData);
  }
}
