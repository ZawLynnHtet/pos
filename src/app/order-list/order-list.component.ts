import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { OrderDetails } from '../models/orderdetails.model';


@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private api: ApiService
    ) { }

    tableId!: number;
    orders: OrderDetails[] = [];
    orderHasBill: boolean = false;
    billTotalAmounts: any = {};

    ngOnInit() {
        this.tableId = this.activatedRoute.snapshot.params['id'];
        this.getAllOrders();
        console.log('order list started')
    }

    goTo(oid: number) {
        this.router.navigate([`payments/${oid}`], { relativeTo: this.activatedRoute });
    }

    async getAllOrders() {
        let responses: OrderDetails[] = await this.api.getAllOrdersWithTableId(this.tableId, true);
        responses = responses.sort((a, b) => a.order_id - b.order_id);
        let oid = 0;
        this.orders = [];
        responses.forEach((ele, i) => {
            if (i == 0) {
                oid = ele.order_id;
                this.orders.push(ele);
            } else if (oid != ele.order_id) {
                oid = ele.order_id;
                this.orders.push(ele);
            }
        });

        let total = 0;
        let paid = 0;
        let tax = 1000;
        this.orders.forEach((order) => {
            total += order.total_price;

            if (order.is_paid) {
                paid += order.total_price;
            }

            if (order.order_submitted) {
                this.orderHasBill = true;
            }
        });

        this.billTotalAmounts.total = total;
        this.billTotalAmounts.paid = paid;
        this.billTotalAmounts.pending = total - paid + tax;
        this.billTotalAmounts.tax = tax;

        console.log(this.orders);
    }

    ngOnDestroy() {
        this.api.unsubscribe();
    }
}
