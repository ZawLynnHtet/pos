import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Bill } from 'src/app/models/bill.model';
import { ExtraFood } from 'src/app/models/extrafood.model';
import { Menu } from 'src/app/models/menu.model';
import { Order } from 'src/app/models/order.model';
import { OrderDetails } from 'src/app/models/orderdetails.model';
import { Table } from 'src/app/models/table.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public chart: any;

  constructor(
    private router: Router,
    private utils: UtilsService,
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  displayedColumns: string[] = [
    'table_id',
    'order_id',
    'price',
    'status',
    'orderedBy',
    'date',
  ];
  dataSource!: MatTableDataSource<any>;
  orders: Order[] = [];
  tables: Table[] = [];
  extraFoods: ExtraFood[] = [];
  allMenus: Menu[] = [];

  async ngOnInit() {
    this.createChart();
    this.createMenuRatingChart();
    this.createTypeRatingChart();

    this.orders = await this.api.getAllOrders();
    this.dataSource = new MatTableDataSource(this.orders);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getDataLocalStorage();
    this.getIngredient();
    this.allMenus = await this.api.getAllMenus();
  }

  getIngredient() {
    var extras = localStorage.getItem('extraFoods');
    this.extraFoods = JSON.parse(extras!);
    this.extraFoods.sort((a, b) => {
      return a.extraFood_id - b.extraFood_id;
    });
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {}

  getDataLocalStorage() {
    var table = localStorage.getItem('tables');
    this.tables = JSON.parse(table!);
  }

  goTo(tid: number, oid: number) {
    this.router.navigateByUrl(`${tid}/${oid}/payments`);
  }

  async getAllUnsubmittedOrdersFromOneTable(id: number, value: boolean) {
    let data = await this.api.getAllOrdersWithTableId(id, value);
    console.log(data);

    data.forEach((order) => {
      if (order.order_submitted === false) {
        this.createBills(data);
      }
    });
  }

  async createBills(orders: OrderDetails[]) {
    let subTotal = 0;
    orders.forEach(async (order) => {
      let total = 0;
      order.extra_ingredients.forEach((id, i) => {
        const extra = this.extraFoods[id - 1];
        total += extra.price;
      });
      this.allMenus.forEach((menu) => {
        if (menu.menu_id === order.menu_id) {
          total += menu.price! * order.quantity;
          subTotal += total;
        }
      });
      const bill: Bill = {
        menu_id: order.menu_id,
        qty: order.quantity,
        total_price: total,
      };
      await this.api.createOneBill(bill, order.order_id);
      const body: Order = {
        total_price: subTotal,
        order_submitted: true,
      };
      await this.api.updateOrder(body, order.order_id);
    });
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          '2023-12-1',
          '2023-12-2',
          '2023-12-3',
          '2023-12-4',
          '2023-12-5',
          '2023-12-6',
          '2023-12-7',
          '2023-12-8',
          '2023-12-9',
          '2023-12-10',
        ],
        datasets: [
          {
            label: 'Sales',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: '#1C4E80',
          },
          {
            label: 'Profit',
            data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
            backgroundColor: '#199CD9',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // aspectRatio: 3.5,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            text: 'Sales & Profit Chart',
            display: true,
            font: {
              size: 18,
            },
          },
        },
      },
    });
  }

  createMenuRatingChart() {
    this.chart = new Chart('MenuRatingChart', {
      type: 'doughnut',

      data: {
        // values on X-Axis
        labels: ['Red', 'Pink', 'Green', 'Yellow', 'Orange'],
        datasets: [
          {
            label: 'Popular menu',
            data: [300, 240, 100, 432, 253],
            backgroundColor: ['red', 'pink', 'green', 'yellow', 'orange'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  createTypeRatingChart() {
    this.chart = new Chart('TypeRatingChart', {
      type: 'doughnut',

      data: {
        // values on X-Axis
        labels: ['Red', 'Pink'],
        datasets: [
          {
            label: 'Most Order Type',
            data: [300, 240],
            backgroundColor: ['red', 'pink'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
