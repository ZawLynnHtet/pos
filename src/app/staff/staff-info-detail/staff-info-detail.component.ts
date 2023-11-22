import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';
@Component({
  selector: 'app-staff-info-detail',
  templateUrl: './staff-info-detail.component.html',
  styleUrls: ['./staff-info-detail.component.css']
})
export class StaffInfoDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    @Inject(StaffService) private staffService: StaffService,
    private router: Router,
  ) { }

  staffId!: string;
  staff: any;

  ngOnInit(): void {
    this.staffId = this.route.snapshot.paramMap.get('id')!;
    this.staffService.getStaffById(this.staffId).subscribe((data: any) => {
      this.staff = data;
    });
  }

  deleteStaff() {
    this.staffService.deleteStaffById(this.staffId).subscribe(
      () => {
        this.router.navigate(['/staffs']); // Redirect to staff list after deletion
      },
      (error) => {
        console.error('Error deleting staff member', error);
      }
    );
  }

}
