import { Component, Inject, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  totalStaff: number = 0;
  constructor(@Inject(StaffService) private staffService: StaffService) {}
  ngOnInit(): void {
    this.staffService.getTotalStaffCount().subscribe((data: any) => {
      this.totalStaff = data.totalStaff;
    });
  }
}
