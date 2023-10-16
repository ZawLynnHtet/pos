import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  tableId!: number;
  foodOrders: any[] = [
    {
      id: '1',
      food: 'Burger',
      qty: 1,
      meatChoice: "Beef",
      excludedToppings: ['Cheese', 'Onion'],
      extraIngreds: ['Beef'],
      extraQty: [1],
      takeaway: false,
      note: "Medium Beef"
    },
    {
      id: '2',
      food: 'Burger',
      qty: 2,
      meatChoice: "Beef",
      excludedToppings: null,
      extraIngreds: null,
      extraQty: null,
      takeaway: true,
      note: null
    },
    {
      id: '3',
      food: 'Monhinga',
      qty: 1,
      meatChoice: null,
      excludedToppings: ["Nan nan", "Chili"],
      extraIngreds: ["Nga phal", "A kyaw"],
      extraQty: [2, 1],
      takeaway: true,
      note: "Reduce chili"
    },
    {
      id: '4',
      food: 'Shan Noodles',
      qty: 1,
      meatChoice: 'Chicken',
      excludedToppings: ["Onion tops", "MSG"],
      extraIngreds: null,
      extraQty: null,
      takeaway: true,
      note: null
    }
  ];

  ngOnInit() {
    this.tableId = this.activatedRoute.snapshot.params['id'];
  }
}
