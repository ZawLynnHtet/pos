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

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private location: Location
  ) {}

  employeesData: any;
  tables: Table[] = [];
  tableId!: number;
  tableIndex!: number;
  allOrders: OrderDetails[][] = []; // going to be [[{}, {}], [{}]]
  headers: any[] = [];

  menuNames: Menu[] = [];
  extraFoods: ExtraFood[] = [];

  async ngOnInit() {
    let data: any = localStorage.getItem('data');
    this.employeesData = JSON.parse(data);
    let table: any = localStorage.getItem('tables');
    this.tables = JSON.parse(table);
    this.tableId = this.activatedRoute.snapshot.params['id'];
    this.tableIndex = this.activatedRoute.snapshot.params['index'];
    this.getItemsFromLocalStorage();

    const orders = await this.getAllUnsubmittedOrdersFromOneTable();
    orders.sort((a, b) => {
      return a.order_id - b.order_id;
    });
    this.allOrders = this.separateOrdersByOrderId(orders);
    console.log(this.allOrders);

    this.headers = this.separateOrderHeaderInfos(this.allOrders);
  }

  getItemsFromLocalStorage() {
    var menus = localStorage.getItem('menuNames');
    this.menuNames = JSON.parse(menus!);
    this.menuNames.sort((a, b) => {
      return a.menu_id - b.menu_id;
    });

    var extras = localStorage.getItem('extraFoods');
    this.extraFoods = JSON.parse(extras!);
    this.extraFoods.sort((a, b) => {
      return a.extraFood_id - b.extraFood_id;
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

  generateBills(orders: OrderDetails[], i: number) {
    var updatedOrders: OrderDetails[] = [];
    if (orders.length > 1) {
      updatedOrders = this.addQuantitiesForSameMenus(orders);
    } else {
      updatedOrders.push(orders[0]);
    }
    this.createBills(updatedOrders, i);
  }

  addQuantitiesForSameMenus(orders: OrderDetails[]): OrderDetails[] {
    orders = orders.sort((a, b) => {
      return a.menu_id - b.menu_id;
    });
    console.log(orders);

    const updatedOrders: OrderDetails[] = [];
    orders.reduce((prevOrder, currOrder, i) => {
      if (prevOrder.menu_id == currOrder.menu_id) {
        prevOrder.quantity += currOrder.quantity;
        prevOrder.extra_ingredients = prevOrder.extra_ingredients.concat(
          currOrder.extra_ingredients
        );
        prevOrder.extra_quantity = prevOrder.extra_quantity.concat(
          currOrder.extra_quantity
        );
        // console.log(`same food i - ${i} so added qty`);
        // console.log(prevOrder);
      } else {
        // console.log(`not same food ${i} vv`);
        // console.log(prevOrder);
        updatedOrders.push(prevOrder);
        prevOrder = currOrder;
      }

      if (i == orders.length - 1) {
        // console.log(`and last item > ${i} vv`);
        // console.log(prevOrder);
        updatedOrders.push(prevOrder);
      }
      return prevOrder;
    });
    return updatedOrders;
  }

  async createBills(orders: OrderDetails[], oindex: number) {
    let subTotal = 0;
    orders.forEach(async (order) => {
      let total = 0;
      order.extra_ingredients.forEach((id, i) => {
        const extra = this.extraFoods[id - 1];
        total += extra.price * order.extra_quantity[i];
      });
      total += this.menuNames[order.menu_id - 1].price! * order.quantity;
      subTotal += total;

      const bill: Bill = {
        menu_id: order.menu_id,
        qty: order.quantity,
        total_price: total,
      };
      await this.api.createOneBill(bill, order.order_id);
    });

    const body: Order = {
      total_price: subTotal,
      order_submitted: true,
    };
    this.allOrders.splice(oindex, 1);
    await this.api.updateOrder(body, orders[0].order_id);
  }

  addOrder() {
    this.router.navigateByUrl('tables/' + this.tableId + '/menu');
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.api.unsubscribe();
  }
}
