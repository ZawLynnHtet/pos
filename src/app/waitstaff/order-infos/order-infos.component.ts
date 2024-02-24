import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'src/app/models/table.model';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/models/order.model';
import { ExtraFood } from 'src/app/models/extrafood.model';
import { Menu } from 'src/app/models/menu.model';
import { UtilsService } from 'src/app/services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-order-infos',
  templateUrl: './order-infos.component.html',
  styleUrls: ['./order-infos.component.css'],
})
export class OrderInfosComponent {
  constructor(
    private router: Router,
    private utils: UtilsService,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private location: Location,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: UtilsService
  ) {}

  displayedColumns: string[] = [
    'table_id',
    'order_id',
    'status',
    'date',
    'details',
  ];
  dataSource!: MatTableDataSource<any>;
  orders: Order[] = [];
  tables: Table[] = [];
  extraFoods: ExtraFood[] = [];
  allMenus: Menu[] = [];
  employeeData: any;

  async ngOnInit() {
    let data: any = localStorage.getItem('data');
    this.employeeData = JSON.parse(data);
    this.orders = await this.api.getAllOrders();

    this.dataSource = new MatTableDataSource(this.orders);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getTables();
    this.allMenus = await this.api.getAllMenus();
    this.extraFoods = await this.api.getAllExtraFoods();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {}

  async getTables() {
    this.tables = await this.api.getAllTables();
  }

  goToDetails(tid: number, oid: number) {
    this.router.navigateByUrl(
      `order-infos/table/${tid}/order/${oid}/each-order-details`
    );
  }
}
