import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { };

  tableId!: number;

  orders: any = [
    {
      name: "Burger",
      qty: 3,
      price: 7000
    },
    {
      name: "Monhinga",
      qty: 1,
      price: 2000
    }, {
      name: "Shan Noodles",
      qty: 1,
      price: 2000
    }
  ];

  ngOnInit() {
    this.tableId = this.activatedRoute.snapshot.params['id'];
  }

  goBack() {
    // this.router.navigateByUrl(`tables/${this.tableId}`);
  }
}
