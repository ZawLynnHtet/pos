import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  tableId!: number;
  orders: any = [
    {
      id: 1234,
      status: "pending",
      total: 5000
    },
    {
      id: 1235,
      status: "completed",
      total: 5000
    },
    {
      id: 1236,
      status: "pending",
      total: 5000
    },
    {
      id: 1237,
      status: "pending",
      total: 5000
    },

  ];

  ngOnInit() {
    this.tableId = this.activatedRoute.snapshot.params['id'];
  }

  goTo(oid: number) {
    this.router.navigate([`payments/${oid}`], { relativeTo: this.activatedRoute });
    console.log(oid);
  }
}
