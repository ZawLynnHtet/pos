import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'src/app/models/table.model';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/models/order.model';
import { OrderDetails } from 'src/app/models/orderdetails.model';
import { ExtraFood } from 'src/app/models/extrafood.model';
import { Menu } from 'src/app/models/menu.model';
import { Bill } from 'src/app/models/bill.model';
import { UtilsService } from 'src/app/services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { PaymentComponent } from '../payment/payment.component';
import { Observable, Subscription, startWith } from 'rxjs';

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
    this.getDataLocalStorage();
    this.getIngredient();
    this.allMenus = await this.api.getAllMenus();
  }

  sendMessage(data: any) {
    this.api.sendMessage(data);
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

  getDataLocalStorage() {
    var table = localStorage.getItem('tables');
    this.tables = JSON.parse(table!);
  }

  async getAllUnsubmittedOrdersFromOneTable(id: number, value: boolean) {
    let data = await this.api.getAllOrdersWithTableId(id, value);
    console.log(data);

    data.forEach((order) => {
      if (order.order_submitted === false) {
        this.createBills(data);
      }
    });
    this.openPaymentDialog(data);
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

  openPaymentDialog(data: any) {
    const dialogRef = this.dialog.open(PaymentComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
      }
    });
  }
}
