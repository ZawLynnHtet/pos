import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, startWith } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  ngOnInit(): void {}
}
