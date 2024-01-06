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
  allMenus: Menu[] = [];
  ingredients: Ingredient[] = [];

  async ngOnInit() {
    let data: any = localStorage.getItem('data');
    this.employeesData = JSON.parse(data);
    let table: any = localStorage.getItem('tables');
    this.tables = JSON.parse(table);
    this.tableId = this.activatedRoute.snapshot.params['tableId'];
    this.tableIndex = this.activatedRoute.snapshot.params['index'];
    this.getItemsFromLocalStorage();

    const orders = await this.getAllUnsubmittedOrdersFromOneTable();
    orders.sort((a, b) => {
      return a.order_id - b.order_id;
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

  /**
   * Separate all orders from api response by order id
   * @param {OrderDetails[]} allOrderSet an array including all data from api response
   * @returns {OrderDetails[][]} an array including other arrays which are separated by order id
   */
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
      // if order is the last item in orderSet
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
    orders.forEach((order) => {
      if (order.order_submitted === false) {
        this.createBills(updatedOrders, i);
      }
    });
    this.goTo(this.tableId, orders[i].order_id);
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

  goTo(tid: number, oid: number) {
    this.router.navigateByUrl(`${tid}/${oid}/payments`);
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.api.unsubscribe();
  }
}
