import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { ExtraFood } from 'src/app/models/extrafood.model';
import { Employee } from 'src/app/models/employee.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Menu } from 'src/app/models/menu.model';
import { OrderDetails } from 'src/app/models/orderdetails.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
})
export class KitchenComponent {
  messageList: any[] = [];
  menuNames: Menu[] = [];
  extraFoods: ExtraFood[] = [];
  allMenus: Menu[] = [];
  ingredients: Ingredient[] = [];
  employees: Employee[] = [];
  orders: OrderDetails[] = [];
  order_id!: number;
  table_id!: number;
  msg_id!: number;

  constructor(
    private api: ApiService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    window.onscroll = () => {
      let header = document.querySelector('.bar');
      header?.classList.toggle('sticky', window.scrollY > 10);
    };
  }

  async ngOnInit() {
    this.msg_id = this.activatedRoute.snapshot.params['msgId'];
    this.order_id = this.activatedRoute.snapshot.params['oid'];
    this.table_id = this.activatedRoute.snapshot.params['id'];

    this.orders = await this.api.getAllOrderDetailsWithOrderId(this.order_id);
    this.employees = await this.api.getAllEmployees();
    this.allMenus = await this.api.getAllMenus();
    this.extraFoods = await this.api.getAllExtraFoods();
    this.ingredients = await this.api.getAllIngredient();
  }

  async print() {
    window.print();
    console.log(this.msg_id);

    await this.api.updateMessages(this.msg_id, { print: true });
  }

  goBack() {
    this.location.back();
  }
}
