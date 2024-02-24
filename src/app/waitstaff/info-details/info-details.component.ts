import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { OrderDetails } from 'src/app/models/orderdetails.model';
import { Menu } from 'src/app/models/menu.model';
import { ExtraFood } from 'src/app/models/extrafood.model';
import { Table } from 'src/app/models/table.model';
import { Bill } from 'src/app/models/bill.model';
import { Order } from 'src/app/models/order.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { PaymentComponent } from '../payment/payment.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-info-details',
  templateUrl: './info-details.component.html',
  styleUrls: ['./info-details.component.css'],
})
export class InfoDetailsComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private location: Location,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: UtilsService
  ) {}

  employeesData: any;
  tables: Table[] = [];
  tableId!: number;
  tableIndex!: number;
  allOrders: OrderDetails[][] = []; // going to be [[{}, {}], [{}]]
  headers: any[] = [];

  menuNames: Menu[] = [];
  extraFoods: ExtraFood[] = [];
  allMenus: Menu[] = [];
  ingredients: Ingredient[] = [];

  async ngOnInit() {
    this.employeesData = await this.api.getAllEmployees();
    let table: any = localStorage.getItem('tables');
    this.tables = JSON.parse(table);
    this.tableId = this.activatedRoute.snapshot.params['tableId'];
    this.tableIndex = this.activatedRoute.snapshot.params['index'];
    this.getItemsFromLocalStorage();

    const orders = await this.getAllUnsubmittedOrdersFromOneTable();

    this.allOrders = this.separateOrdersByOrderId(orders);
    console.log(this.allOrders);

    this.headers = this.separateOrderHeaderInfos(this.allOrders);
    this.allMenus = await this.api.getAllMenus();
  }

  getItemsFromLocalStorage() {
    var extras = localStorage.getItem('extraFoods');
    this.extraFoods = JSON.parse(extras!);
    this.extraFoods.sort((a, b) => {
      return a.extraFood_id - b.extraFood_id;
    });

    var ingredient = localStorage.getItem('ingredients');
    this.ingredients = JSON.parse(ingredient!);
    this.ingredients.sort((a, b) => {
      return a.ingredient_id - b.ingredient_id;
    });
  }

  async getAllUnsubmittedOrdersFromOneTable(): Promise<OrderDetails[]> {
    return await this.api.getAllOrdersWithTableId(this.tableId, false);
  }

  separateOrdersByOrderId(allOrderSet: OrderDetails[]): OrderDetails[][] {
    var oid = 0;
    var orderDetailsFromOneOrder: OrderDetails[] = [];
    var separatedOrders: any[] = [];

    allOrderSet.forEach((order: OrderDetails, i) => {
      if (oid == 0) {
        oid = order.order_id;
        orderDetailsFromOneOrder.push(order);
      } else if (oid != order.order_id) {
        oid = order.order_id;
        separatedOrders.push(orderDetailsFromOneOrder);
        orderDetailsFromOneOrder = [];
        orderDetailsFromOneOrder.push(order);
      } else {
        orderDetailsFromOneOrder.push(order);
      }
      if (i == allOrderSet.length - 1) {
        separatedOrders.push(orderDetailsFromOneOrder);
      }
    });
    return separatedOrders;
  }

  separateOrderHeaderInfos(separatedOrders: OrderDetails[][]): any[] {
    const infos: any[] = [];
    separatedOrders.forEach((orderDetailsFromOneOrder: OrderDetails[]) => {
      var qty = 0;
      orderDetailsFromOneOrder.forEach((order) => {
        qty += order.quantity;
      });

      const header = {
        id: orderDetailsFromOneOrder[0].order_id,
        waitstaff_id: orderDetailsFromOneOrder[0].waitstaff_id,
        date: new Date(orderDetailsFromOneOrder[0].orderDate).toLocaleString(),
        total_qty: qty,
      };
      infos.push(header);
    });
    return infos;
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
      if (order.order_submitted == false) {
        console.log('False');

        await this.api.createOneBill(bill, order.order_id);
      } else {
        console.log('True');
      }
    });

    const body: Order = {
      total_price: subTotal,
      order_submitted: true,
    };
    await this.api.updateOrder(body, orders[0].order_id);
    this.openPaymentDialog(orders);
    const orderData = await this.getAllUnsubmittedOrdersFromOneTable();
    this.allOrders = this.separateOrdersByOrderId(orderData);
  }

  addOrder() {
    this.router.navigateByUrl('tables/' + this.tableId + '/menu');
  }

  openPaymentDialog(data: any) {
    const dialogRef = this.dialog.open(PaymentComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(async (val) => {
      if (val) {
        const orders = await this.getAllUnsubmittedOrdersFromOneTable();
        this.allOrders = this.separateOrdersByOrderId(orders);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.api.unsubscribe();
  }
}
