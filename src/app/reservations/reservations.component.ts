import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  sortedBy: string = 'latest';
  showDropdown: boolean = false;

  sortedByList: any = ['latest', 'table number', 'customer name'];

  reservations: any = [{
    id: 1,
    date: "13-10-2023",
    time: '16:00',
    people: 4,
    tableno: 2, reservedBy: "Kyaw Kyaw"
  },
  {
    id: 2,
    date: "13-10-2023",
    time: '16:00',
    people: 4,
    tableno: 2, reservedBy: "Kyaw Kyaw"
  },
  {
    id: 3,
    date: "13-10-2023",
    time: '16:00',
    people: 4,
    tableno: 2, reservedBy: "Kyaw Kyaw"
  },
  {
    id: 4,
    date: "13-10-2023",
    time: '16:00',
    people: 4,
    tableno: 2, reservedBy: "Kyaw Kyaw"
  },
  {
    id: 5,
    date: "13-10-2023",
    time: '16:00',
    people: 4,
    tableno: 2, reservedBy: "Kyaw Kyaw"
  },
  ];

  goTo(reservId: number) {
    this.router.navigate([`${reservId}`], { relativeTo: this.activatedRoute });
  }

  sort(i: number) {
    this.sortedBy = this.sortedByList[i];
  }

  createReservation() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  openDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
