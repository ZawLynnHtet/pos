import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Bill } from '../models/bill.model';
import { Menu } from '../models/menu.model';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
  ) { };

  tableId!: number;
  orderId!: number;

  // orders: any = [
  //   {
  //     name: "Burger",
  //     qty: 3,
  //     price: 7000
  //   },
  //   {
  //     name: "Monhinga",
  //     qty: 1,
  //     price: 2000
  //   }, {
  //     name: "Shan Noodles",
  //     qty: 1,
  //     price: 2000
  //   }
  // ];

  bills: Bill[] = [];
  totalAmounts: any = {};
  menuNames: Menu[] = [];

  ngOnInit() {
    this.tableId = this.activatedRoute.snapshot.params['id'];
    this.orderId = this.activatedRoute.snapshot.params['oid'];

    const names = localStorage.getItem('menuNames');

    if (names != null) {
      this.menuNames = JSON.parse(names);
      this.menuNames.sort((a, b) => { return a.menu_id - b.menu_id });

      console.log(this.menuNames);
    }

    this.getAllBillsFromOneOrder();
  }

  goBack() {
    // this.router.navigateByUrl(`tables/${this.tableId}`);
  }

  async getAllBillsFromOneOrder() {
    this.bills = await this.api.getAllBillsWithOrderId(this.orderId);
    this.updateTotalAmounts();
  }

  updateTotalAmounts() {
    let total = 0;
    let discount = 0;
    let tax = 1000;

    this.bills.forEach(bill => {
      total += bill.total_price;
    });

    this.totalAmounts.total = total;
    this.totalAmounts.discount = discount;
    this.totalAmounts.tax = tax;
    this.totalAmounts.subTotal = total + tax - discount;
  }

  async updateOrderPaymentStatus(oid: number) {
    await this.api.updateOrder({ is_paid: true }, oid);
  }
}
