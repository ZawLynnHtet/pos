import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Reservation } from '../models/reservation.model';
// import * as moment from 'moment';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reserv-details',
  templateUrl: './reserv-details.component.html',
  styleUrls: ['./reserv-details.component.css'],
})
export class ReservDetailsComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  // reservDetails: any = [{
  //   id: 1,
  //   date: "13-10-2023",
  //   time: '16:00',
  //   people: 4,
  //   tableno: 2,
  //   reservedBy: "Kyaw Kyaw",
  //   prepared: "Pork beef, soup, dessert",
  //   note: "sdf dsf sdf"
  // },
  // {
  //   id: 2,
  //   date: "13-10-2023",
  //   time: '16:00',
  //   people: 4,
  //   tableno: 2,
  //   reservedBy: "Kyaw Kyaw",
  //   prepared: "Pork beef, soup, dessert",
  //   note: null
  // },
  // {
  //   id: 3,
  //   date: "13-10-2023",
  //   time: '16:00',
  //   people: 4,
  //   tableno: 2,
  //   reservedBy: "Kyaw Kyaw",
  //   prepared: null,
  //   note: null
  // },
  // {
  //   id: 4,
  //   date: "13-10-2023",
  //   time: '16:00',
  //   people: 4,
  //   tableno: 2,
  //   reservedBy: "Kyaw Kyaw",
  //   prepared: "Pork beef, soup, dessert",
  //   note: "sdf dsf sdf"
  // },
  // {
  //   id: 5,
  //   date: "13-10-2023",
  //   time: '16:00',
  //   people: 4,
  //   tableno: 2,
  //   reservedBy: "Kyaw Kyaw",
  //   prepared: "Pork beef, soup, dessert",
  //   note: "sdf dsf sdf"
  // },
  // ];

  reservDetails!: Reservation;
  reservId!: number;
  date!: any;

  async ngOnInit() {
    this.reservId = this.activatedRoute.snapshot.params['reservId'];
    await this.getReservationDetails();
    this.date = new Date(this.reservDetails.reserved_at).toLocaleString();
    console.log(this.reservDetails.reserved_at);
  }

  async getReservationDetails() {
    this.reservDetails = await this.api.getReservationDetails(this.reservId);
  }

  async cancelReservation() {
    const deleted = await this.api.deleteReservation(this.reservId);

    if (deleted) {
      this.router.navigateByUrl('/reservations');
    }
  }

  ngOnDestroy() {
    this.api.unsubscribe();
  }
}
