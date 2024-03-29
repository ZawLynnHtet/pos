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
import { Restaurant } from '../models/info.model';

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
  showMenu: boolean = false;
  sideNav: any[] = [];
  restaurantInfo: Restaurant[] = [];
  logo: string = '..//..//../assets/images/logo.png';
  resName: string = 'Restaurant Name';

  constructor(private api: ApiService) {}
  navData = [
    {
      routeLink: '/dashboard',
      icon: 'fa-solid fa-chart-line',
      label: 'Dashboard',
      role: ['manager'],
    },
    {
      routeLink: '/tables',
      icon: 'fa-solid fa-table-cells',
      label: 'Tables',
      role: ['waiter', 'supervisor'],
    },
    {
      routeLink: '/order-infos',
      icon: 'fa-regular fa-rectangle-list',
      label: 'Order Infos',
      role: ['waiter', 'supervisor'],
    },
    {
      routeLink: '/tables-page',
      icon: 'fa-solid fa-table-cells',
      label: 'Tables',
      role: ['manager'],
    },
    {
      routeLink: '/menus',
      icon: 'fa fa-cutlery',
      label: 'Menus',
      role: ['manager'],
    },
    {
      routeLink: '/reservations',
      icon: 'fa fa-calendar-o',
      label: 'Reservations',
      role: ['supervisor'],
    },
    {
      routeLink: '/employees',
      icon: 'fa-solid fa-users',
      label: 'Employees',
      role: ['manager'],
    },
    {
      routeLink: '/settings',
      icon: 'fa-solid fa-gear',
      label: 'Settings',
      role: ['manager'],
    },
    {
      routeLink: '/auth',
      icon: 'fa-solid fa-arrow-right-from-bracket',
      label: 'Logout',
      role: ['waiter', 'supervisor', 'manager'],
    },
  ];

  async ngOnInit(){
    let data: any = localStorage.getItem('data');
    this.employeesData = JSON.parse(data);
    this.navData.forEach((nav) => {
      if (nav.role.includes(this.employeesData.role)) {
        this.sideNav.push(nav);
      }
    });
    this.restaurantInfo = await this.api.getRestaurantInfo();
    this.restaurantInfo.forEach((value) => {
      if(value){
        this.resName = value.restaurant_name;
        this.logo = value.logoImg;
      }
    })
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  closeSidenav() {
    this.collapsed = false;
  }
}
