import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { Message } from 'src/app/models/message.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  message: Message[] = [];
  waiters: Employee[] = [];
  msgOpen: boolean = false;
  unReadMessage: Message[] = [];
  employeeData: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private eRef: ElementRef,
    private snackBar: UtilsService,
    private utils: UtilsService
  ) {
    window.onscroll = () => {
      let header = document.querySelector('.toolbar');
      header?.classList.toggle('sticky', window.scrollY > 10);
    };
  }

  async ngOnInit() {
    this.unReadMessage = await this.api.getMessagesByUnread(false);
    this.message = await this.api.getMessages(false);
    // this.api.getMessage().subscribe(async (message: any) => {
    //   console.log(message);

    //   if (message.length != 0) {
    //     this.unReadMessage = await this.api.getMessagesByUnread(false);
    //     this.message = await this.api.getMessages(false);
    //   }
    // });
    let data: any = localStorage.getItem('data');
    this.employeeData = JSON.parse(data);

    this.waiters = await this.api.getAllEmployees();
  }

  async goToDetails(msgId: number, tid: number, oid: number, kitchen: boolean) {
    await this.api.updateMessages(msgId, { read: true });
    if (kitchen == false) {
      this.router.navigateByUrl(
        `message/${msgId}/table/${tid}/order/${oid}/bills`
      );
    } else {
      this.router.navigateByUrl(
        `message/${msgId}/table/${tid}/order/${oid}/kitchen`
      );
    }
  }

  openMsg() {
    if (this.message.length > 0) {
      this.msgOpen = !this.msgOpen;
    } else {
      this.snackBar.openSnackBar("There's no message...!");
    }
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  closeMsg(event: { target: any }) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.msgOpen = false;
    }
  }
}
