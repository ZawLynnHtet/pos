import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {
  constructor(
    private router: Router,

  ) { }

  role: string = '';

  tables = [
    {
      id: 1,
      status: "Unavailable",
      capacity: "4"
    },
    {
      id: 2,
      status: "Available",
      capacity: "4"
    },
    {
      id: 3,
      status: "Available",
      capacity: "4"
    },
    {
      id: 4,
      status: "Available",
      capacity: "4"
    },
    {
      id: 5,
      status: "Available",
      capacity: "4"
    },
    {
      id: 6,
      status: "Available",
      capacity: "4"
    },
    {
      id: 7,
      status: "Available",
      capacity: "4"
    },
    {
      id: 8,
      status: "Available",
      capacity: "4"
    },
    {
      id: 9,
      status: "Available",
      capacity: "4"
    },
    {
      id: 10,
      status: "Unavailable",
      capacity: "4"
    },
    {
      id: 11,
      status: "Available",
      capacity: "3"
    },
    {
      id: 12,
      status: "Available",
      capacity: "4"
    },
    {
      id: 13,
      status: "Unavailable",
      capacity: "2"
    },
    {
      id: 14,
      status: "Available",
      capacity: "4"
    },
    {
      id: 15,
      status: "Available",
      capacity: "5"
    },
    {
      id: 16,
      status: "Available",
      capacity: "4"
    },
    {
      id: 17,
      status: "Unavailable",
      capacity: "4"
    },
    {
      id: 18,
      status: "Available",
      capacity: "4"
    },
    {
      id: 19,
      status: "Available",
      capacity: "4"
    },
    {
      id: 20,
      status: "Unavailable",
      capacity: "4"
    },
  ];

  goTo(i: number) {
    this.role = localStorage.getItem('role') == null ? 'supervisor' : localStorage.getItem('role')!;

    if (this.role == 'waiter') {
      this.router.navigateByUrl('menus');
    } else if (this.role == 'supervisor') {
      this.router.navigateByUrl(`tables/${i}`);
    };

  }
}
