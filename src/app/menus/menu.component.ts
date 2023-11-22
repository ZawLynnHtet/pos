import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Category } from '../models/category.model';
import { Table } from '../models/table.model';
import { Order } from '../models/order.model';
import { Menu } from '../models/menu.model';
import { Ingredient } from '../models/ingredient.model';
import { DetailsBody } from '../models/orderdetails.model';
import { UtilsService } from '../services/utils.service';

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
  newOrder: Order[] = [];
  menus: Menu[] = [];
  orderTypeIndex?: number;
  categoryId?: number;
  orderType: string = 'Dine In';
  orderTypes = ['Dine In', 'Take Away'];
  ingredients: Ingredient[] = [];
  detailIngredient: any = [];
  menuNames: Menu[] = [];

  selectedForm = new FormGroup({
    meat: new FormControl(''),
    topping: new FormControl(''),
    extra: new FormControl(''),
  });

  categories: Category[] = [];
  tables: Table[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private utils: UtilsService
  ) {}

  async ngOnInit() {
    this.categories = await this.api.getAllCategories();
    this.showMenus(this.categories[0].category_id);
    this.getTableData();
    this.tableId = this.activatedRoute.snapshot.params['id'];
    this.tableIndex = this.activatedRoute.snapshot.params['tableIndex'];
    this.getIngredient();
  }

  async showMenus(id: number) {
    this.menus = await this.api.getMenus(id);
    this.categoryId = id;
  }

  async getIngredient() {
    // this.ingredients = await this.api.getAllIngredient();
    this.ingredients = this.utils.getSortedLocalStorageArray(
      'ingredients',
      'ingredients_id'
    );
    this.menuNames = this.utils.getSortedLocalStorageArray(
      'menuNames',
      'menu_id'
    );
  }

  async getTableData() {
    this.tables = await this.api.getAllTables();
  }

  showTopping(index: number) {
    this.detailIngredient = [];
    this.topping = true;
    this.selectedIndex = index;
    for (let i = 0; i < this.ingredients.length; i++) {
      if (
        this.menus[index].ingredient_ids.includes(
          this.ingredients[i].ingredient_id
        )
      ) {
        this.detailIngredient.push({
          ingredient_name: this.ingredients[i].ingredient_name,
        });
      }
    }
  }

  closeTopping() {
    this.topping = false;
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

  addOrder(id: number, menu: any) {
    const order: DetailsBody = {
      quantity: 0,
      menu_id: menu.menu_id,
      choice_of_meat: null,
      removed_ingredients: [],
      extra_ingredients: [],
      extra_quantity: [],
      takeaway: false,
      note: null,
    };
    if (this.orders.length == 0) {
      // menu.quantity++;
      // this.orders.push(menu);
      order.quantity++;
      this.orders.push(order);
    } else {
      const i = this.orders.findIndex((order) => {
        return order.menu_id == menu.menu_id;
      });
      if (i == -1) {
        order.quantity++;
        this.orders.push(order);
        // menu.quantity++;
        // this.orders.push(menu);
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
}
