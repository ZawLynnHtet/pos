import { Component, Inject, OnInit } from '@angular/core';
import { StaffService } from '../../../../services/staff.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css'],
})
export class SupervisorComponent implements OnInit {
  staffs: any[] = [];

  constructor(@Inject(StaffService) private staffService: StaffService) {}

  ngOnInit(): void {
    this.staffService.getStaffByRole('supervisor').subscribe((data: any) => {
      this.staffs = data;
    });
  }
}
