import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/models/bill.model';
import { Menu } from 'src/app/models/menu.model';
import { Table } from 'src/app/models/table.model';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private location: Location,
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: UtilsService
  ) {}
  employeesData: any;
  tables: Table[] = [];
  tableIndex!: number;
  allMenus: Menu[] = [];

  bills: Bill[] = [];
  totalAmounts: any = {};

  async ngOnInit() {
    console.log('Patch Value is ' + JSON.stringify(this.data));

    this.bills = await this.api.getAllBillsWithOrderId(this.data[0].order_id);
    console.log(this.bills);

    this.updateTotalAmounts();

    let waitData: any = localStorage.getItem('data');
    this.employeesData = JSON.parse(waitData);
    this.tables = await this.api.getAllTables();
    this.allMenus = await this.api.getAllMenus();
  }

  updateTotalAmounts() {
    let total = 0;
    let discount = 0;
    let tax = 1000;

    this.bills.forEach((bill) => {
      total += bill.total_price;
    });

    this.totalAmounts.total = total;
    this.totalAmounts.discount = discount;
    this.totalAmounts.tax = tax;
    this.totalAmounts.subTotal = total + tax - discount;
  }

  async payBill() {
    await this.api.pay(this.data[0].order_id, { is_paid: true });
    this.getTableData();
    let msg = {
      table_id: this.data[0].table_id,
      order_id: this.data[0].order_id,
      waiter_id: this.data[0].waitstaff_id,
      kitchen_id: false,
      read: false,
      print: false,
    };
    this.sendMessage(msg);
    await this.api.postMessages(msg);
    this.snackBar.openSnackBar('Bill successful!');
    this.dialogRef.close(true);
  }

  sendMessage(data: any) {
    this.api.sendMessage(data);
  }

  async getTableData() {
    const checkOrder = await this.api.getAllOrdersWithTableId(
      this.data[0].table_id,
      false
    );
    console.log(checkOrder);

    if (checkOrder.length === 0) {
      await this.api.updateTable(this.data[0].table_id, { is_available: true });
      console.log('Success');
    }
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.api.unsubscribe();
  }
}
