import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css'],
})
export class EditStaffComponent {
  staffId?: string;
  staff: any;
  updatedStaffData: any = {};
  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService
  ) {}

  updateStaff() {
    this.staffService
      .updateStaffById(this.staffId!, this.updatedStaffData)
      .subscribe(
        (data: any) => {
          this.staff = data.staff;
        },
        (error) => {
          console.error('Error updating staff member', error);
        }
      );
  }
}
