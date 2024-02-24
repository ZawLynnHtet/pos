import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Reservation } from '../../models/reservation.model';
import { Router } from '@angular/router';
import { Table } from '../../models/table.model';
import { Employee } from '../../models/employee.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css'],
})
export class NewReservationComponent {
  constructor(
    private api: ApiService,
    private router: Router,
    public dialogRef: MatDialogRef<NewReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: UtilsService,
    private utils: UtilsService
  ) {}

  tables: Table[] = [];
  numOfPeople: number = 0;
  selectionTables: Table[] = [];
  employeeData: any[] = [];

  reservationForm = new FormGroup({
    supervisor: new FormControl({ value: '', disabled: true }),
    supervisor_id: new FormControl(0),
    cus_name: new FormControl('', [Validators.required]),
    table_id: new FormControl(0, [Validators.required]),
    reserved_date: new FormControl(null, [Validators.required]),
    reserved_time: new FormControl(null, [Validators.required]),
    num_of_people: new FormControl(0, [Validators.required]),
    reserved_by: new FormControl(null, [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    prepared: new FormControl(null),
    notes: new FormControl(null),
    deposit: new FormControl(0),
    reserved_at: new FormControl(),
  });

  async ngOnInit() {
    this.reservationForm.patchValue(this.data);
    this.tables = await this.api.getAllTables();
    let data: any = localStorage.getItem('data');
    this.employeeData = JSON.parse(data);
  }

  async submitted() {
    if (this.reservationForm.valid) {
      if (this.data) {
        await this.api.editReservation(
          this.data.id,
          this.reservationForm.value
        );
        this.snackBar.openSnackBar('Reservation updated successful!');
        this.dialogRef.close(true);
      } else {
        await this.api.makeReservation(this.reservationForm.value);
        this.snackBar.openSnackBar('Reservation created successful!');
        this.dialogRef.close(true);
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
