import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Reservation } from '../models/reservation.model';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  sortedBy: string = 'latest';
  showDropdown: boolean = false;
  sortedByList: any = ['latest', 'date', 'table number', 'customer name'];

  reservations: Reservation[] = [];

  ngOnInit() {
    this.updateReservations();
  }

  async updateReservations() {
    this.reservations = await this.api.getAllReservations();

    this.reservations.sort((a: Reservation, b: Reservation) => {
      const a_date = new Date(a.reserved_date);
      const b_date = new Date(b.reserved_date);
      return a_date.getTime() - b_date.getTime();
    });
  }

  goTo(reservId: number) {
    this.router.navigate([`${reservId}`], { relativeTo: this.activatedRoute });
  }

  sort(i: number) {
    this.sortedBy = this.sortedByList[i];

    switch (this.sortedBy) {
      case 'latest': {
        this.reservations.sort((a: Reservation, b: Reservation) => {
          const a_date = new Date(a.reserved_date);
          const b_date = new Date(b.reserved_date);
          return a_date.getTime() - b_date.getTime();
        });
        break;
      }
      case 'date': {
        this.reservations.sort((a: Reservation, b: Reservation) => {
          const a_date = new Date(a.reserved_date);
          const b_date = new Date(b.reserved_date);

          let reserv = a_date.getTime() - b_date.getTime();
          if (reserv == 0) {
            reserv = a.reserved_time.localeCompare(b.reserved_time);
          }
          return reserv;
        });
        break;
      }
      case 'table number': {
        this.reservations.sort((a: Reservation, b: Reservation) => {
          return a.table_id - b.table_id;
        });
        break;
      }
      case 'customer name': {
        this.reservations.sort((a: Reservation, b: Reservation) => {
          return a.reserved_by.localeCompare(b.reserved_by);
        });
        break;
      }
    }
    // this.reservations.some();
  }

  createReservation() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  openDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
