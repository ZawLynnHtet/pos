import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';
import { Table } from '../../models/table.model';
import { Order } from '../../models/order.model';
import { Menu } from '../../models/menu.model';
import { Ingredient } from '../../models/ingredient.model';
import { DetailsBody, OrderDetails } from '../../models/orderdetails.model';
import { UtilsService } from '../../services/utils.service';
import { ExtraFood } from '../../models/extrafood.model';
import { Bill } from 'src/app/models/bill.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  topping: boolean = false;
  selected: boolean = false;
  showDropdown: boolean = false;
  selectedIndex: number = 0;
  orders: any[] = [];
  tableIndex!: number;
  tableId!: number;
  newOrders: any = [];
  menus: Menu[] = [];
  allMenus: Menu[] = [];
  orderTypeIndex?: number;
  categoryId?: number;
  orderType: string = 'Dine In';
  orderTypes = ['Dine In', 'Take Away'];
  ingredients: Ingredient[] = [];
  menuNames: Menu[] = [];
  employeesData: any;
  categories: any = [];
  table: Table[] = [];
  tables: Table[] = [];
  property: any;
  extraFoods: ExtraFood[] = [];
  selectedMenu!: Menu;
  selectedForm!: FormGroup;
  orderId = 0;
  allOrders: OrderDetails[][] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private utils: UtilsService,
    private fb: FormBuilder
  ) {
    this.selectedForm = fb.group({
      meat: new FormControl(''),
      toppings: new FormArray([]),
      extras: new FormArray([]),
      notes: new FormArray([]),
    });
  }

  async ngOnInit() {
    let data: any = localStorage.getItem('data');
    this.employeesData = JSON.parse(data);
    let category: any = localStorage.getItem('categories');
    this.categories = JSON.parse(category);
    this.showMenus(this.categories[0].category_id);
    this.tableId = this.activatedRoute.snapshot.params['id'];
    this.tableIndex = this.activatedRoute.snapshot.params['tableIndex'];
    console.log(this.tableId + '/' + this.tableIndex);
    this.getIngredient();
    this.table = await this.api.getOneTable(this.tableId);
    let tableData: any = localStorage.getItem('tables');
    this.tables = JSON.parse(tableData);
    this.allMenus = await this.api.getAllMenus();
  }

  createOrder() {
    this.api
      .addOrders({
        table_id: this.tableId,
        waitstaff_id: this.employeesData.id,
        order_type: 'Dine In',
      })
      .subscribe((res: any) => {
        this.orderId = res.data.order_id;
        console.log('order created >> ', this.orderId);
        localStorage.setItem('order', JSON.stringify(res.data));
      });
  }

  checkOrderIdAndCreateOrder() {
    if (this.orderId == 0) {
      this.createOrder();
    }
  }

  async showMenus(id: number) {
    this.menus = await this.api.getMenus(id);
    this.categoryId = id;
  }

  getIngredient() {
    this.ingredients = this.utils.getSortedLocalStorageArray(
      'ingredients',
      'ingredients_id'
    );
    this.menuNames = this.utils.getSortedLocalStorageArray(
      'menuNames',
      'menu_id'
    );

    this.extraFoods = this.utils.getSortedLocalStorageArray(
      'extraFoods',
      'extraFood_id'
    );
  }

  showTopping(index: number, menu: Menu) {
    this.topping = true;
    this.selectedIndex = index;
    this.selectedMenu = menu;
    this.checkOrderIdAndCreateOrder();
    const order: DetailsBody = {
      order_id: this.orderId,
      quantity: 0,
      menu_id: menu.menu_id,
      choice_of_meat:
        menu.meat_choice != null && menu.meat_choice.length > 0
          ? menu.meat_choice[0]
          : null,
      removed_ingredients: [],
      extra_ingredients: [],
      extra_quantity: [],
      takeaway: false,
      note: null,
    };
    this.selectedForm.controls['meat'].patchValue(order.choice_of_meat);
    order.quantity++;
    this.orders.push(order);
  }

  onCheckboxChange(event: any, formCtlName: string) {
    const array: FormArray = this.selectedForm.controls[
      `${formCtlName}`
    ] as FormArray;
    if (event.target.checked) {
      array.push(new FormControl(event.target.value));
    } else {
      const index = array.controls.findIndex(
        (x) => x.value === event.target.value
      );
      array.removeAt(index);
    }
    const order = this.orders[this.orders.length - 1];
    if (formCtlName == 'extras') {
      order.extra_ingredients = array.value;
    } else if (formCtlName == 'toppings') {
      order.removed_ingredients = array.value;
    }
  }

  closeTopping() {
    this.topping = false;
    const removed_ingred: FormArray = this.selectedForm.controls[
      'toppings'
    ] as FormArray;
    const extras: FormArray = this.selectedForm.controls['extras'] as FormArray;
    this.selectedForm.controls['meat'].patchValue('');
    removed_ingred.clear();
    extras.clear();
  }

  addOrdersWithChoice() {
    if (
      this.selectedMenu.menu_id == this.orders[this.orders.length - 1].menu_id
    ) {
      this.orders[this.orders.length - 1].quantity++;
    }
  }

  sort(i: number) {
    this.orderType = this.orderTypes[i];
  }

  openDropdown(index: number) {
    this.orderTypeIndex = index;
    this.showDropdown = !this.showDropdown;
  }

  addOrder(id: number, menu: any) {
    this.checkOrderIdAndCreateOrder();
    const order: DetailsBody = {
      order_id: this.orderId,
      quantity: 0,
      menu_id: menu.menu_id,
      choice_of_meat:
        menu.meat_choice != null && menu.meat_choice.length > 0
          ? menu.meat_choice[0]
          : null,
      removed_ingredients: [],
      extra_ingredients: [],
      extra_quantity: [],
      takeaway: false,
      note: null,
    };
    if (this.orders.length == 0) {
      order.quantity++;
      this.orders.push(order);
    } else {
      const i = this.orders.findIndex((order) => {
        const meat =
          menu.meat_choice != null && menu.meat_choice.length > 0
            ? menu.meat_choice[0]
            : null;
        return (
          order.menu_id == menu.menu_id &&
          order.removed_ingredients.length == 0 &&
          order.extra_ingredients.length == 0 &&
          order.extra_quantity.length == 0 &&
          order.choice_of_meat == meat &&
          (order.note == null || order.note == '')
        );
      });
      console.log(i);
      if (i == -1) {
        order.quantity++;
        this.orders.push(order);
      } else {
        this.orders[i].quantity++;
      }
    }
  }

  changeOrderType(i: number) {
    this.orders[i].takeaway = !this.orders[i].takeaway;
  }

  del(index: number) {
    this.orders.splice(index, 1);
  }

  submitOrder() {
    this.orders.forEach(async (order) => {
      if (order.order_id != this.orderId) {
        order.order_id = this.orderId;
      }
      await this.api.createOrderDetails(order);
      console.log('order created', order);
    });
    this.orderId = 0;
    this.orders = [];
    this.tables[this.tableIndex].is_available = false;
    localStorage.setItem('tables', JSON.stringify(this.tables));
  }

  onRadioBtnChange(evt: any) {
    const meat = this.selectedForm.controls['meat'].value;
    const order: OrderDetails = this.orders[this.orders.length - 1];
    order.choice_of_meat = meat;
  }

  onNoteBoxChange(evt: any, i: number) {
    this.orders[i].note = evt.target.value;
    console.log(this.orders);
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
      // if order is the last item in orderSet
      if (i == allOrderSet.length - 1) {
        separatedOrders.push(orderDetailsFromOneOrder);
      }
    });
    return separatedOrders;
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
}
