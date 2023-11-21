import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Category } from '../models/category.model';
import { Table } from '../models/table.model';
import { Order } from '../models/order.model';
import { Menu } from '../models/menu.model';
import { Ingredient } from '../models/ingredient.model';

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
  ingredient: Ingredient[] = [];

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
    private api: ApiService
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
    this.ingredient = await this.api.getAllIngredient();
    localStorage.setItem('ingredient', JSON.stringify(this.ingredient));
  }

  async getTableData() {
    this.tables = await this.api.getAllTables();
  }

  showTopping(index: number) {
    this.topping = true;
    this.selectedIndex = index;
    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].ingredient_ids?.includes(3)) {
        console.log('hello');
      } else {
        console.log('HI');
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

  addOrder(id: number, menu: any) {
    if (this.orders.length == 0) {
      menu.quantity++;
      this.orders.push(menu);
    } else {
      const i = this.orders.findIndex((order) => {
        return order.food_name == menu.food_name;
      });
      if (i == -1) {
        menu.quantity++;
        this.orders.push(menu);
      } else {
        this.orders[i].quantity++;
      }
    }
  }

  del(index: number) {
    this.orders.splice(index, 1);
  }

  reduce(index: number, qty: any) {
    if (qty.quantity != 0) {
      qty.quantity--;
      if (qty.quantity === 0) {
        this.orders.splice(index, 1);
      }
    }
  }

  submitOrder() {
    this.orders = [];
  }
}
