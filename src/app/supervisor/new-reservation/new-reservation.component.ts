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

  ngOnInit() {
    this.reservationForm.patchValue(this.data);
    const string = localStorage.getItem('tables');
    this.tables = JSON.parse(string!);
    let data: any = localStorage.getItem('data');
    this.employeeData = JSON.parse(data);

    // this.updateSupervisorName();
  }

  // updateSupervisorName() {
  //   const supervisors: Employee[] = JSON.parse(
  //     localStorage.getItem('supervisors')!
  //   );

  //   const id: any = sessionStorage.getItem('id');

  //   const employee = supervisors.find((empl) => {
  //     return empl.employee_id == id * 1;
  //   });

  //   if (employee) {
  //     this.reservationForm.patchValue({
  //       supervisor: employee.name,
  //     });
  //   }
  // }

  // getNumOfPeople() {
  //   this.numOfPeople = this.reservationForm.value.num_of_people!;
  //   console.log(this.numOfPeople);

  //   this.selectionTables = [];
  //   this.tables.forEach((table) => {
  //     if (table.capacity >= this.numOfPeople) {
  //       this.selectionTables.push(table);
  //     }
  //   });
  // }

  // async reserve() {
  //   const id: any = sessionStorage.getItem('id');

  //   this.reservationForm.patchValue({
  //     supervisor_id: id * 1,
  //     table_id: this.reservationForm.value.table_id! * 1,
  //     num_of_people: this.reservationForm.value.num_of_people! * 1,
  //     deposit: this.reservationForm.value.deposit! * 1,
  //     reserved_at: new Date(),
  //   });

  //   const reservation: Reservation = await this.api.makeReservation(
  //     this.reservationForm.value
  //   );
  //   console.log(reservation);

  //   this.router.navigateByUrl('/reservations');
  // }

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
