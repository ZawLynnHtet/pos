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
import 'chartjs-plugin-datalabels';
import { DatePipe } from '@angular/common';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public chart: any;
  pieChartPlugins = [];
  search: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private datePipe: DatePipe
  ) {
    window.onscroll = () => {
      let header = document.querySelector('app-header');
      header?.classList.toggle('sticky', window.scrollY > 10);
    };
  }

  displayedColumns: string[] = [
    'table_id',
    'order_id',
    'status',
    'date',
    'details',
  ];
  dataSource!: MatTableDataSource<any>;
  orders: Order[] = [];
  orderDetails: OrderDetails[] = [];
  tables: Table[] = [];
  extraFoods: ExtraFood[] = [];
  allMenus: Menu[] = [];
  popularMenu: any = [];
  popularType = {};
  getIncomeByDay: any[] = [];
  getIncomeByWeek: any[] = [];
  getIncomeByMonthly: any[] = [];
  totalSale: any[] = [];
  date = ['weekly', 'monthly'];
  popularMenuDate = ['daily', 'weekly', 'monthly'];
  pmdValue: string = 'daily';
  message: string = '';
  value: string = 'weekly';
  showYear: boolean = false;
  yearDate: string = '2024';

  takeaway = 0;
  dineIn = 0;
  months = [
    { month: 'January', price: null },
    { month: 'February', price: null },
    { month: 'March', price: null },
    { month: 'April', price: null },
    { month: 'May', price: null },
    { month: 'June', price: null },
    { month: 'July', price: null },
    { month: 'August', price: null },
    { month: 'September', price: null },
    { month: 'October', price: null },
    { month: 'November', price: null },
    { month: 'December', price: null },
  ];
  days = [
    { day: 'Sat', price: null },
    { day: 'Sun', price: null },
    { day: 'Mon', price: null },
    { day: 'Tue', price: null },
    { day: 'Wed', price: null },
    { day: 'Thu', price: null },
    { day: 'Fri', price: null },
  ];
  label: any[] = [];
  employeeData: any;
  waiters: Employee[] = [];

  async ngOnInit() {
    let data: any = localStorage.getItem('data');
    this.employeeData = JSON.parse(data);

    this.waiters = await this.api.getAllEmployees();
    let takeawayCount = 0;
    let dineInCount = 0;
    this.orderDetails = await this.api.getOrderDetailsByDay();

    this.orderDetails.forEach((order) => {
      if (order.takeaway == true) {
        takeawayCount++;
        this.takeaway = (takeawayCount / this.orderDetails.length) * 100;
      } else if (order.takeaway == false) {
        dineInCount++;

        this.dineIn = (dineInCount / this.orderDetails.length) * 100;
      }
    });

    if (this.search == false) {
      this.getData(this.value);
    }

    this.getPopularMenu(this.pmdValue);
    this.tables = await this.api.getAllTables();
    this.orders = await this.api.getOrderCountByToday();
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getIngredient();
    this.allMenus = await this.api.getAllMenus();
  }

  async getPopularMenu(params: string) {
    if (params === 'daily') {
      this.message = "There's no popular menu in this day!";
    } else if (params === 'weekly') {
      this.message = "There's no popular menu in this week!";
    } else {
      this.message = "There's no popular menu in this month!";
    }
    this.popularMenu = await this.api.getPopularMenus(params);
  }

  async getSearchDate(searchValue: string) {
    this.showYear = false;
    this.search = true;
    this.totalSale = [];
    this.label = [];
    this.days.forEach((value) => {
      this.label.push(value.day);
      value.price = null;
    });

    this.getIncomeByDay = await this.api.getIncomeBySearchDate(searchValue);
    this.getIncomeByDay.forEach((value) => {
      const date = new Date(value.date);
      const dayName = this.datePipe.transform(date, 'EE');

      const index = this.days.findIndex((day) => day.day === dayName);

      this.days[index].price = value.totalPrice;
    });

    this.days.forEach((item) => {
      this.totalSale.push(item.price);
    });
    this.reloadChart();
  }

  async betweenYear(value: string) {
    this.getIncomeByMonthly = await this.api.getIncomeByMonthBetweenYear(value);
  }

  async getData(params: string) {
    this.search = false;
    this.totalSale = [];
    this.label = [];
    if (params === 'weekly') {
      this.getIncomeByWeek = await this.api.getIncomeByDate(params);
      this.showYear = false;
      this.days.forEach((value) => {
        this.label.push(value.day);
      });
      this.getIncomeByWeek.forEach((value) => {
        const date = new Date(value.date);
        const dayName = this.datePipe.transform(date, 'EE');
        const index = this.days.findIndex((day) => day.day === dayName);
        this.days[index].price = value.totalPrice;
      });

      this.days.forEach((item) => {
        this.totalSale.push(item.price);
      });
    } else if (params === 'monthly') {
      this.getIncomeByMonthly = await this.api.getIncomeByMonthBetweenYear(
        this.yearDate
      );
      this.showYear = true;
      this.months.forEach((value) => {
        this.label.push(value.month);
      });
      this.getIncomeByMonthly.forEach((value) => {
        const date = new Date(value.month);
        const monthName = this.datePipe.transform(date, 'MMMM');
        const index = this.months.findIndex((day) => day.month === monthName);
        this.months[index].price = value.totalPrice;
      });

      this.months.forEach((item) => {
        this.totalSale.push(item.price);
      });
    }

    this.reloadChart();
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  reloadChart() {
    this.destroyChart();
    this.createChart();
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
      type: 'bar',

      data: {
        labels: this.label,
        datasets: [
          {
            label: 'Sales',
            data: this.totalSale,
            backgroundColor: '#1C4E80',
          },
          // {
          //   label: 'Profit',
          //   data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
          //   backgroundColor: '#199CD9',
          // },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            display: true,
            font: {
              size: 18,
            },
          },
        },
      },
    });
  }

  goToDetails(tid: number, oid: number) {
    this.router.navigateByUrl(
      `order-infos/table/${tid}/order/${oid}/each-order-details`
    );
  }
}
