import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  collapsed = false;
  employees: Employee[] = [];
  employeesData: any;

  constructor(private api: ApiService) {}
  navData = [
    {
      routeLink: '/tables',
      icon: 'fa-solid fa-table-cells',
      label: 'Tables',
    },
    {
      routeLink: '/menus',
      icon: 'fa fa-cutlery',
      label: 'Menus',
    },
    {
      routeLink: '/reservations',
      icon: 'fa fa-calendar-o',
      label: 'Reservations',
    },
    {
      routeLink: '/employees',
      icon: 'fa-solid fa-users',
      label: 'Employees',
    },
    {
      routeLink: '/auth',
      icon: 'fa-solid fa-arrow-right-from-bracket',
      label: 'Logout',
    },
  ];

  ngOnInit(): void {
    let data: any = localStorage.getItem('data');
    this.employeesData = JSON.parse(data);
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  closeSidenav() {
    this.collapsed = false;
  }
}
