import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Reservation } from '../../models/reservation.model';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NewReservationComponent } from '../new-reservation/new-reservation.component';
import { MatTableDataSource } from '@angular/material/table';
import { UtilsService } from '../../services/utils.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReservDetailsComponent } from '../reserv-details/reserv-details.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent {
  displayedColumns: string[] = [
    'name',
    'phone',
    'reservedBy',
    'date',
    'action',
    'details',
  ];
  name: string[] = [];
  role: string[] = [];
  reservations: Reservation[] = [];
  dataSource!: MatTableDataSource<any>;
  reservationDetails!: Reservation;
  employeeData: any;

  constructor(
    private api: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: UtilsService
  ) {}

  ngOnInit() {
    let data: any = localStorage.getItem('data');
    this.employeeData = JSON.parse(data);
    this.getReservation();
  }

  async getReservation() {
    this.reservations = await this.api.getAllReservations();
    this.dataSource = new MatTableDataSource(this.reservations);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data = this.reservations.filter((user) =>
      user.cus_name.toLowerCase().startsWith(filterValue)
    );

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async deleteReservation(id: number) {
    await this.api.deleteReservation(id);
    this.snackBar.openSnackBar('Reservation deleted successful', 'done!');
    this.getReservation();
  }

  openReservationFormDialog() {
    const dialogRef = this.dialog.open(NewReservationComponent);

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.getReservation();
      }
    });
  }

  async openEditFormDialog(data: any) {
    const dialogRef = this.dialog.open(NewReservationComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.getReservation();
      }
    });
  }

  openReservationDetailsDialog(data: any) {
    const dialogRef = this.dialog.open(ReservDetailsComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
      }
    });
  }
}
