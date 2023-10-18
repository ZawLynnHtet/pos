import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reserv-details',
  templateUrl: './reserv-details.component.html',
  styleUrls: ['./reserv-details.component.css']
})
export class ReservDetailsComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  reservDetails: any = [{
    id: 1,
    date: "13-10-2023",
    time: '16:00',
    people: 4,
    tableno: 2,
    reservedBy: "Kyaw Kyaw",
    prepared: "Pork beef, soup, dessert",
    note: "sdf dsf sdf"
  },
  {
    id: 2,
    date: "13-10-2023",
    time: '16:00',
    people: 4,
    tableno: 2,
    reservedBy: "Kyaw Kyaw",
    prepared: "Pork beef, soup, dessert",
    note: null
  },
  {
    id: 3,
    date: "13-10-2023",
    time: '16:00',
    people: 4,
    tableno: 2,
    reservedBy: "Kyaw Kyaw",
    prepared: null,
    note: null
  },
  {
    id: 4,
    date: "13-10-2023",
    time: '16:00',
    people: 4,
    tableno: 2,
    reservedBy: "Kyaw Kyaw",
    prepared: "Pork beef, soup, dessert",
    note: "sdf dsf sdf"
  },
  {
    id: 5,
    date: "13-10-2023",
    time: '16:00',
    people: 4,
    tableno: 2,
    reservedBy: "Kyaw Kyaw",
    prepared: "Pork beef, soup, dessert",
    note: "sdf dsf sdf"
  },
  ];

  reservId!: number;

  ngOnInit() {
    this.reservId = this.activatedRoute.snapshot.params['reservId'];
  }
}
