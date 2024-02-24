import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Bill } from '../../models/bill.model';
import { Menu } from '../../models/menu.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private location: Location
  ) {
    window.onscroll = () => {
      let header = document.querySelector('.bar');
      header?.classList.toggle('sticky', window.scrollY > 10);
    };
  }

  table_id!: number;
  order_id!: number;
  msg_id!: number;

  bills: Bill[] = [];
  totalAmounts: any = {};
  allMenus: Menu[] = [];

  async ngOnInit() {
    this.msg_id = this.activatedRoute.snapshot.params['msgId'];
    this.order_id = this.activatedRoute.snapshot.params['oid'];
    this.table_id = this.activatedRoute.snapshot.params['id'];
    this.allMenus = await this.api.getAllMenus();

    this.getAllBillsFromOneOrder();
  }

  goBack() {
    this.location.back();
  }

  async print() {
    window.print();
    await this.api.updateMessages(this.msg_id, { print: true });
  }

  async getAllBillsFromOneOrder() {
    this.bills = await this.api.getAllBillsWithOrderId(this.order_id);
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

  async updateOrderPaymentStatus(oid: number) {
    await this.api.updateOrder({ is_paid: true }, oid);
  }
}
