import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { OrderDetails } from 'src/app/models/orderdetails.model';
import { Table } from 'src/app/models/table.model';
import { Employee } from 'src/app/models/employee.model';
import { Menu } from 'src/app/models/menu.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ExtraFood } from 'src/app/models/extrafood.model';

@Component({
  selector: 'app-each-order-details',
  templateUrl: './each-order-details.component.html',
  styleUrls: ['./each-order-details.component.css'],
})
export class EachOrderDetailsComponent implements OnInit {
  oid!: number;
  tid!: number;
  details: any;
  tables: Table[] = [];
  orders: any;
  waiters: Employee[] = [];
  allMenus: Menu[] = [];
  ingredients: Ingredient[] = [];
  extraFoods: ExtraFood[] = [];
  date!: string;
  notes!: string;
  status: boolean = false;

  constructor(
    private api: ApiService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}
  async ngOnInit() {
    this.oid = this.activatedRoute.snapshot.params['oid'];
    this.tid = this.activatedRoute.snapshot.params['tid'];
    this.details = await this.api.getAllOrderDetailsWithOrderId(this.oid);
    console.log(this.details);
    this.notes = this.details.note;

    this.orders = await this.api.getOrderById(this.oid);
    console.log(this.orders.orderDate);
    this.date = this.orders.orderDate;
    this.status = this.orders.is_paid;

    this.waiters = await this.api.getAllEmployees();
    this.tables = await this.api.getAllTables();
    this.allMenus = await this.api.getAllMenus();
    this.ingredients = await this.api.getAllIngredient();
    this.extraFoods = await this.api.getAllExtraFoods();
  }

  goBack() {
    this.location.back();
  }
}
