import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/models/bill.model';
import { Menu } from 'src/app/models/menu.model';
import { Table } from 'src/app/models/table.model';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private location: Location
  ) {}
  employeesData: any;
  tables: Table[] = [];
  tableId!: number;
  orderId!: number;
  tableIndex!: number;
  allMenus: Menu[] = [];

  bills: Bill[] = [];
  totalAmounts: any = {};

  async ngOnInit() {
    let data: any = localStorage.getItem('data');
    this.employeesData = JSON.parse(data);
    this.tables = await this.api.getAllTables();
    this.orderId = this.activatedRoute.snapshot.params['orderId'];
    this.tableId = this.activatedRoute.snapshot.params['tableId'];
    this.allMenus = await this.api.getAllMenus();
    this.getAllBillsFromOneOrder();
  }

  async getAllBillsFromOneOrder() {
    this.bills = await this.api.getAllBillsWithOrderId(this.orderId);
    console.log(this.bills);

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

  async payBill() {
    await this.api.pay(this.orderId, { is_paid: true });
    const checkOrder = await this.api.getAllOrdersWithTableId(
      this.tableId,
      false
    );
    console.log(checkOrder);

    if (checkOrder === null) {
      await this.api.updateTable(this.tableId, { is_available: true });
    }
    // await this.api.updateTable(this.tableId, { is_available: true });
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.api.unsubscribe();
  }
}
