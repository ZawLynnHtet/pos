import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Order } from '../../models/order.model';
import { OrderDetails } from '../../models/orderdetails.model';
import { ExtraFood } from '../../models/extrafood.model';
import { Menu } from '../../models/menu.model';
import { Bill } from '../../models/bill.model';
import { OrderListComponent } from '../order-list/order-list.component';
import { Table } from '../../models/table.model';
import { Location } from '@angular/common';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
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
    this.tables = await this.api.getAllTables();
    this.tableId = this.activatedRoute.snapshot.params['id'];

    const orders = await this.getAllUnsubmittedOrdersFromOneTable();
    orders.sort((a, b) => {
      return b.order_id - a.order_id;
    });
    this.allOrders = this.separateOrdersByOrderId(orders);
    console.log(this.allOrders);

    this.headers = this.separateOrderHeaderInfos(this.allOrders);
    this.allMenus = await this.api.getAllMenus();
    this.extraFoods = await this.api.getAllExtraFoods();
    this.ingredients = await this.api.getAllIngredient();
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
