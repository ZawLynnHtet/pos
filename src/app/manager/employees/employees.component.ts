import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  waitstaffs: any = [];
  supervisors: any = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    let waiter: any = localStorage.getItem('waitstaffs');
    this.waitstaffs = JSON.parse(waiter);

    let supervisor: any = localStorage.getItem('supervisors');
    this.supervisors = JSON.parse(supervisor);
  }

  goDetails(id: number) {
    this.router.navigateByUrl('employees/' + id);
  }
}
