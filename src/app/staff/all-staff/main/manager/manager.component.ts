import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../../services/staff.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit{
  staffs: any[] = [];

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.staffService.getStaffByRole('manager').subscribe((data: any) => {
      this.staffs = data;
    });
  }
  
}
