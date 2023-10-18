import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent {
  supervisor: string = 'Kyaw Oo';

  reservationForm = new FormGroup({
    supervisor: new FormControl({ value: this.supervisor, disabled: true }),
    tableNo: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    time: new FormControl(null, [Validators.required]),
    numOfPeople: new FormControl(null, [Validators.required]),
    reservedBy: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    prepared: new FormControl(null),
    notes: new FormControl(null),
    deposit: new FormControl(null),
  });

  ngOnInit() {

  }

  reserve() {
    console.log(this.reservationForm.value);
  }
}
