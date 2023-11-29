import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Category } from '../models/category.model';
import { Table } from '../models/table.model';
import { Order } from '../models/order.model';
import { Menu } from '../models/menu.model';
import { Ingredient } from '../models/ingredient.model';
import { DetailsBody, OrderDetails } from '../models/orderdetails.model';
import { UtilsService } from '../services/utils.service';
import { ExtraFood } from '../models/extrafood.model';

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
  tableIndex?: number;
  tableId?: number;
  newOrders: any = [];
  menus: Menu[] = [];
  orderTypeIndex?: number;
  categoryId?: number;
  orderType: string = 'Dine In';
  orderTypes = ['Dine In', 'Take Away'];
  ingredients: Ingredient[] = [];
  menuNames: Menu[] = [];
  employeesData: any;
  categories: Category[] = [];
  tables: Table[] = [];
  property: any;
  extraFoods: ExtraFood[] = [];
  selectedMenu!: Menu;
  selectedForm!: FormGroup;

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
    });
  }

  async ngOnInit() {
    let data: any = localStorage.getItem('data');
    this.employeesData = JSON.parse(data);
    this.categories = await this.api.getAllCategories();
    this.showMenus(this.categories[0].category_id);
    this.getTableData();
    this.tableId = this.activatedRoute.snapshot.params['id'];
    this.tableIndex = this.activatedRoute.snapshot.params['tableIndex'];
    this.getIngredient();
  }

  createOrder() {
    this.api
      .addOrders({
        table_id: this.tableId,
        waitstaff_id: this.employeesData.employee_id,
        order_type: 'Dine In',
      })
      .subscribe((res: any) => {
        localStorage.setItem('order', JSON.stringify(res.data));
        let data: any = localStorage.getItem('order');
        this.newOrders = JSON.parse(data);
        console.log(this.newOrders.order_id);
      });
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

  async getTableData() {
    this.tables = await this.api.getAllTables();
  }

  showTopping(index: number, menu: Menu) {
    this.topping = true;
    this.selectedIndex = index;
    this.selectedMenu = menu;
    const order: DetailsBody = {
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
  }

  addOrdersWithChoice() {
    // this.selectedIndex;
    this.orders[this.selectedIndex].quantity++;
  }

  sort(i: number) {
    this.orderType = this.orderTypes[i];
  }

  openDropdown(index: number) {
    this.orderTypeIndex = index;
    this.showDropdown = !this.showDropdown;
  }

  reduce(menu: Menu) {
    const i = this.orders.findIndex((order) => {
      return order.menu_id == menu.menu_id;
    });

    if (i > -1) {
      if (this.orders[i].quantity > 1) {
        this.orders[i].quantity--;
      } else {
        this.orders.splice(i, 1);
      }
    }
  }

  remove() {
    const i = this.orders.findIndex((order) => {
      return order.menu_id == this.selectedMenu.menu_id;
    });

    if (i > -1) {
      if (this.orders[i].quantity > 1) {
        this.orders[i].quantity--;
      } else {
        this.orders.splice(i, 1);
      }
    }
  }

  addOrder(id: number, menu: any) {
    const order: DetailsBody = {
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
          order.choice_of_meat == meat
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
    this.orders = [];
  }

  onRadioBtnChange(evt: any) {
    const meat = this.selectedForm.controls['meat'].value;
    const order: OrderDetails = this.orders[this.orders.length - 1];
    order.choice_of_meat = meat;
  }
}
