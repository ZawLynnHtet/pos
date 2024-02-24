import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { OrderDetails } from '../../models/orderdetails.model';
import { Table } from '../../models/table.model';
import { UtilsService } from '../../services/utils.service';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../../models/order.model';
import { ExtraFood } from '../../models/extrafood.model';
import { Menu } from '../../models/menu.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Bill } from '../../models/bill.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  constructor(
    private router: Router,
    private utils: UtilsService,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private location: Location,
    private snackBar: UtilsService
  ) {}

  displayedColumns: string[] = [
    'table_id',
    'order_id',
    'status',
    'date',
    'kitchen',
    'bills',
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
    this.getIngredient();
    this.allMenus = await this.api.getAllMenus();
  }

  getIngredient() {
    var extras = localStorage.getItem('extraFoods');
    this.extraFoods = JSON.parse(extras!);
    this.extraFoods.sort((a, b) => {
      return a.extraFood_id - b.extraFood_id;
    });
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {}

  async getTables() {
    this.tables = await this.api.getAllTables();
  }

  async getAllUnsubmittedOrdersFromOneTable(id: number, value: boolean) {
    let data = await this.api.getAllOrdersWithTableId(id, value);
    console.log(data);

    data.forEach((order) => {
      if (order.order_submitted === false) {
        this.createBills(data);
      }
    });
  }

  async createBills(orders: OrderDetails[]) {
    let subTotal = 0;
    orders.forEach(async (order) => {
      let total = 0;
      order.extra_ingredients.forEach((id, i) => {
        const extra = this.extraFoods[id - 1];
        total += extra.price;
      });
      this.allMenus.forEach((menu) => {
        if (menu.menu_id === order.menu_id) {
          total += menu.price! * order.quantity;
          subTotal += total;
        }
      });
      const bill: Bill = {
        menu_id: order.menu_id,
        qty: order.quantity,
        total_price: total,
      };
      await this.api.createOneBill(bill, order.order_id);
      const body: Order = {
        total_price: subTotal,
        order_submitted: true,
      };
      await this.api.updateOrder(body, order.order_id);
    });
  }

  goToBills(id: number, oid: number) {
    this.router.navigateByUrl(`table/${id}/order/${oid}/bills`);
  }

  goToKitchen(id: number, oid: number) {
    this.router.navigateByUrl(`table/${id}/order/${oid}/kitchen`);
  }
}
