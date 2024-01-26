import { Component } from '@angular/core';
import { Observable, Subscription, startWith } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
})
export class KitchenComponent {
  messageList: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getNewMessage().subscribe((message: any) => {
      this.messageList.push(message);

      console.log('Message Lists are' + this.messageList);
    });
  }
}
