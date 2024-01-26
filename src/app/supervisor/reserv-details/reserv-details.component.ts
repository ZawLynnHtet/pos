import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Reservation } from '../../models/reservation.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reserv-details',
  templateUrl: './reserv-details.component.html',
  styleUrls: ['./reserv-details.component.css'],
})
export class ReservDetailsComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    public dialogRef: MatDialogRef<ReservDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  reservationDetails!: Reservation;

  async ngOnInit() {
    this.reservationDetails = await this.api.getReservationDetails(
      this.data.id
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.api.unsubscribe();
  }
}
