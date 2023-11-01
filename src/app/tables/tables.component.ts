import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Table } from '../models/table.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  constructor(private router: Router, private api: ApiService) {}

  role: string = '';

  tables: Table[] = [];
  ngOnInit() {
    this.getTableData();
  }
  async getTableData() {
    this.tables = await this.api.getAllTables();
    // console.log(this.tables);
  }

  goTo(id: number) {
    this.role =
      localStorage.getItem('role') == null
        ? 'supervisor'
        : localStorage.getItem('role')!;

    if (this.role == 'waiter') {
      this.router.navigateByUrl('tables/' + id + '/menus');
    } else if (this.role == 'supervisor') {
      this.router.navigateByUrl(`tables/${id}`);
    }
  }
}
