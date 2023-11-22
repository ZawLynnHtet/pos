import { Component, Inject, OnInit } from '@angular/core';
import { StaffService } from '../../../../services/staff.service';

@Component({
  selector: 'app-wait-staff',
  templateUrl: './wait-staff.component.html',
  styleUrls: ['./wait-staff.component.css'],
})
export class WaitStaffComponent implements OnInit {
  staffs: any[] = [];

  constructor(@Inject(StaffService) private staffService: StaffService) {}

  ngOnInit(): void {
    this.staffService.getStaffByRole('waitstaff').subscribe((data: any) => {
      this.staffs = data;
    });
  }
}
