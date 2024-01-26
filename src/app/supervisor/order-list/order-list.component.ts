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
import { Observable, Subscription, startWith } from 'rxjs';
import { Document } from '../../models/document';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  constructor(
    private api: ApiService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  tables: Table[] = [];
  tableId!: number;
  tableIndex!: number;
  allOrders: OrderDetails[][] = []; // going to be [[{}, {}], [{}]]
  headers: any[] = [];

  menuNames: Menu[] = [];
  extraFoods: ExtraFood[] = [];
  allMenus: Menu[] = [];
  ingredients: Ingredient[] = [];
  employees: Employee[] = [];

  async ngOnInit() {
    this.employees = await this.api.getAllEmployees();
    let table: any = localStorage.getItem('tables');
    this.tables = JSON.parse(table);
    this.tableId = this.activatedRoute.snapshot.params['id'];
    this.getItemsFromLocalStorage();

    const orders = await this.getAllUnsubmittedOrdersFromOneTable();
    orders.sort((a, b) => {
      return b.order_id - a.order_id;
    });
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

  async createBills(orders: OrderDetails[], oindex: number) {
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
      if (order.order_submitted === false) {
        await this.api.createOneBill(bill, order.order_id);
      }
    });

    const body: Order = {
      total_price: subTotal,
      order_submitted: true,
    };
    // this.allOrders.splice(oindex, 1);
    await this.api.updateOrder(body, orders[0].order_id);
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.api.unsubscribe();
  }
}
