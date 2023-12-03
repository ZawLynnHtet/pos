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

  employeesData: any;
  available_table_count: number = 0;
  tables: Table[] = [];

  ngOnInit() {
    this.getTableData();
    let data: any = localStorage.getItem('data');
    this.employeesData = JSON.parse(data);
  }

  async getTableData() {
    this.tables = await this.api.getAllTables();
    // console.log(this.tables);
    let unavailable = 0;
    this.tables.forEach((table) => {
      if (!table.is_available) {
        unavailable++;
      }
    });
    this.available_table_count = this.tables.length - unavailable;
  }

  goTo(id: number, index: number) {
    if (
      this.employeesData.role === 'waiter' &&
      this.tables[index].is_available === true
    ) {
      this.router.navigateByUrl('tables/' + id + '/menu');
    } else if (
      this.employeesData.role === 'supervisor' ||
      this.tables[index].is_available === false
    ) {
      this.router.navigateByUrl(`tables/${id}`);
    }
  }

  // createOrder(){
  //   this.api.addOrder().subscribe((res)=> {
  //     console.log(res);

  //   })
  // }
}
