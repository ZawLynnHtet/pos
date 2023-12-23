import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { OrderDetails } from 'src/app/models/orderdetails.model';
import { Menu } from 'src/app/models/menu.model';
import { ExtraFood } from 'src/app/models/extrafood.model';
import { Table } from 'src/app/models/table.model';
import { Bill } from 'src/app/models/bill.model';
import { Order } from 'src/app/models/order.model';
import { Sort } from '@angular/material/sort';
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
  ) {
    this.sortedData = this.allOrders.slice();
  }
  sortedData: OrderDetails[];
  employeesData: any;
  tables: Table[] = [];
  tableId!: number;
  orderId!: number;
  tableIndex!: number;
  allOrders: OrderDetails[] = []; // going to be [[{}, {}], [{}]]
  allMenus: Menu[] = [];

  extraFoods: ExtraFood[] = [];
  ingredients: Ingredient[] = [];
  bills: Bill[] = [];
  totalAmounts: any = {};

  async ngOnInit() {
    let data: any = localStorage.getItem('data');
    this.employeesData = JSON.parse(data);
    let table: any = localStorage.getItem('tables');
    this.tables = JSON.parse(table);
    this.orderId = this.activatedRoute.snapshot.params['orderId'];
    this.tableId = this.activatedRoute.snapshot.params['tableId'];
    this.getItemsFromLocalStorage();
    this.allOrders = await this.api.getAllOrderdetailsWithOrderId(this.orderId);
    this.getAllBillsFromOneOrder();
    this.allMenus = await this.api.getAllMenus();
  }

  sortData(sort: Sort) {
    const data = this.allOrders.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  }

  async getAllBillsFromOneOrder() {
    this.bills = await this.api.getAllBillsWithOrderId(this.orderId);
    this.updateTotalAmounts();
  }

  updateTotalAmounts() {
    let total = 0;
    let discount = 0;
    let tax = 1000;

    this.bills.forEach((bill) => {
      total += bill.total_price;
    });

    this.totalAmounts.total = total;
    this.totalAmounts.discount = discount;
    this.totalAmounts.tax = tax;
    this.totalAmounts.subTotal = total + tax - discount;
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

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.api.unsubscribe();
  }
}
