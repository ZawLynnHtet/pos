import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'src/app/models/table.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  messageList: any;
  constructor(private router: Router, private api: ApiService) {}

  employeesData: any;
  available_table_count: number = 0;
  tables: Table[] = [];

  async ngOnInit() {
    let data: any = localStorage.getItem('data');
    this.employeesData = JSON.parse(data);
    this.tables = await this.api.getAllTables();
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
      this.router.navigateByUrl(`tables/${id}/${index}/menu`);
    } else if (
      this.employeesData.role === 'waiter' &&
      this.tables[index].is_available === false
    ) {
      this.router.navigateByUrl(`order-infos/${id}/details`);
    } else if (
      this.employeesData.role === 'supervisor' &&
      this.tables[index].is_available === false
    ) {
      this.router.navigateByUrl(`tables/${id}/order-details`);
    }
  }

  // createOrder(){
  //   this.api.addOrder().subscribe((res)=> {
  //     console.log(res);

  //   })
  // }
}
