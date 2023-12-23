import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'src/app/models/table.model';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-infos',
  templateUrl: './order-infos.component.html',
  styleUrls: ['./order-infos.component.css'],
})
export class OrderInfosComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private location: Location
  ) {}

  displayedColumns: string[] = [
    'table_id',
    'order_id',
    'price',
    'status',
    'date',
  ];
  dataSource!: MatTableDataSource<any>;
  orders: Order[] = [];
  tables: Table[] = [];

  async ngOnInit() {
    this.orders = await this.api.getAllOrders();
    this.dataSource = new MatTableDataSource(this.orders);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getDataLocalStorage();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDataLocalStorage() {
    var table = localStorage.getItem('tables');
    this.tables = JSON.parse(table!);
    this.tables.sort((a, b) => {
      return a.table_id - b.table_id;
    });
  }

  showDetails(orderId: number, tableId: number) {
    this.router.navigateByUrl(`order-infos/${orderId}/${tableId}/details`);
  }
}
