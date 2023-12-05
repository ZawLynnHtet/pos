import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.css'],
})
export class EmployeesDetailsComponent implements OnInit {
  employees: any = [];
  employee_id?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  async ngOnInit() {
    this.employee_id = this.activatedRoute.snapshot.params['id'];
    console.log(this.employee_id);

    this.employees = await this.api.getOneEmployee(this.employee_id!);
    console.log(this.employees);
  }
}
