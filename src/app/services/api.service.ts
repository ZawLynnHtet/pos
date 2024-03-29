import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/utils/constants';
import { Table } from '../models/table.model';
import { SubSink } from 'subsink/dist/subsink';
import { Order } from '../models/order.model';
import { DetailsBody, OrderDetails } from '../models/orderdetails.model';
import { Category } from '../models/category.model';
import { Menu, MenuItem } from '../models/menu.model';
import { Reservation } from '../models/reservation.model';
import { Bill } from '../models/bill.model';
import { ExtraFood } from '../models/extrafood.model';
import { Ingredient } from '../models/ingredient.model';
import { Employee } from '../models/employee.model';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { Vinyl } from '../models/vinyl.model';
import { Restaurant } from '../models/info.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private socket: Socket) {}

  private subs = new SubSink();

  public message: BehaviorSubject<any> = new BehaviorSubject([]);

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getMessage() {
    this.socket.on('message', (message: any) => {
      this.message.next(message);
    });

    return this.message.asObservable();
  }

  getAllTables(): Promise<Table[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/tables`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getOneTable(id: number): Promise<Table[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/tables/${id}`).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  updateTable(id: number, value: any): Promise<Table[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .patch(`${apiUrl}/tables/${id}`, value)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  postTable(data: any): Promise<Table[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.post(`${apiUrl}/tables/`, data).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  deleteTable(id: number): Promise<Table[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.delete(`${apiUrl}/tables/${id}`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getMenus(id: number): Promise<Menu[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .get(`${apiUrl}/menus/category/${id}`)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getAllMenus(): Promise<Menu[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/menus`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  postMenu(data: MenuItem): Promise<MenuItem[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.post(`${apiUrl}/menus`, data).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  updateMenu(id: number, data: MenuItem): Promise<MenuItem[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .patch(`${apiUrl}/menus/${id}`, data)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  editOneMenu(id: number, data: MenuItem): Promise<MenuItem[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .patch(`${apiUrl}/menus/${id}`, data)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  deleteOneMenu(id: number): Promise<Menu[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.delete(`${apiUrl}/menus/${id}`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  postEmployee(data: Employee): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .post(`${apiUrl}/employees/register`, data)
        .subscribe({
          next: (res: any) => {
            resolve(res.user);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  updateEmployee(id: number, data: Employee): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .patch(`${apiUrl}/employees/${id}`, data)
        .subscribe({
          next: (res: any) => {
            resolve(res);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getAllIngredient(): Promise<Ingredient[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/ingredients`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  postIngredient(data: any): Promise<Ingredient[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.post(`${apiUrl}/ingredients`, data).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getOneEmployee(id: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/employees/${id}`).subscribe({
        next: (res: any) => {
          resolve(res.user);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  deleteOneEmployee(id: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.delete(`${apiUrl}/employees/${id}`).subscribe({
        next: (res: any) => {
          resolve(res.user);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getAllEmployees(): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/employees`).subscribe({
        next: (res: any) => {
          resolve(res.user);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getEmployeesWithRole(role?: string): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      let url;
      if (role) {
        url = `${apiUrl}/employees?role='${role}'`;
      } else {
        url = `${apiUrl}/employees`;
      }

      this.subs.sink = this.http.get(url).subscribe({
        next: (res: any) => {
          resolve(res.user);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getTableCapacities(): Promise<Table[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/tables/capacity`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  registerEmployee(data: any) {
    return this.http.post(`${apiUrl}/employees/register`, data);
  }

  loginEmployee(data: any) {
    return this.http.post(`${apiUrl}/employees/login`, data);
  }

  addOrders(data: any) {
    return this.http.post(`${apiUrl}/orders`, data);
  }

  getAllOrders(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/orders`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getOrderById(id: number): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/orders/${id}`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  pay(id: number, data: Order): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .patch(`${apiUrl}/orders/${id}`, data)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getAllOrdersWithTableId(
    id: number,
    is_paid: boolean
  ): Promise<OrderDetails[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .get(`${apiUrl}/orders/table/${id}?is_paid=${is_paid}`)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getAllOrderDetailsWithOrderId(id: number): Promise<OrderDetails[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .get(`${apiUrl}/orderdetails/order/${id}`)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getAllOrderDetails(): Promise<OrderDetails[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/orderdetails`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getAllCategories(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/categories`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  postCategory(data: any): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.post(`${apiUrl}/categories`, data).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  updateOrder(body: Order, oid: number): Promise<Order> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .patch(`${apiUrl}/orders/${oid}`, body)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getAllBillsWithOrderId(id: number): Promise<Bill[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/orders/${id}/bills`).subscribe({
        next: (res: any) => {
          resolve(res.bills);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  createOneBill(body: Bill, oid: number): Promise<Bill> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .post(`${apiUrl}/orders/${oid}/bills`, body)
        .subscribe({
          next: (res: any) => {
            resolve(res.bill);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getAllReservations(): Promise<Reservation[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/reservations`).subscribe({
        next: (res: any) => {
          resolve(res.reservations);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getReservationDetails(id: number): Promise<Reservation> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/reservations/${id}`).subscribe({
        next: (res: any) => {
          resolve(res.reservation);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  makeReservation(body: any): Promise<Reservation> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .post(`${apiUrl}/reservations`, body)
        .subscribe({
          next: (res: any) => {
            resolve(res.reservation);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  deleteReservation(id: number): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .delete(`${apiUrl}/reservations/${id}`)
        .subscribe({
          next: (res: any) => {
            resolve(true);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  editReservation(id: number, data: any): Promise<Reservation> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .patch(`${apiUrl}/reservations/${id}`, data)
        .subscribe({
          next: (res: any) => {
            resolve(res.reservation);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getAllFoodNames(): Promise<Menu[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/menus/names`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getAllExtraFoods(): Promise<ExtraFood[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/extra-food`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getOneExtraFood(id: number): Promise<ExtraFood[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/extra-food/${id}`).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  postExtraFood(data: any): Promise<ExtraFood[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.post(`${apiUrl}/extra-food`, data).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  createOrderDetails(body: DetailsBody): Promise<OrderDetails> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .post(`${apiUrl}/orderdetails`, body)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (err: any) => {
            reject(err);
          },
        });
    });
  }

  getIncomeByDate(date: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/bills/${date}`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getIncomeByMonthBetweenYear(year: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .get(`${apiUrl}/bills/monthly/${year}`)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getIncomeBySearchDate(date: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .get(`${apiUrl}/bills/date?createdAt=${date}`)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getPopularMenus(date: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .get(`${apiUrl}/orderdetails/popular-menu/${date}`)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  postMessages(data: any): Promise<Message[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.post(`${apiUrl}/message`, data).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getMessages(params: boolean): Promise<Message[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .get(`${apiUrl}/message/printed?print=${params}`)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getMessagesByUnread(params: boolean): Promise<Message[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .get(`${apiUrl}/message/read?read=${params}`)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  updateMessages(id: number, data: any): Promise<Message[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .patch(`${apiUrl}/message/${id}`, data)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getOrderCountByToday(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/orders/count`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getOrderDetailsByDay(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/orderdetails/day`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getVinyl(): Promise<Vinyl[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/vinyl`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  postVinyl(body: any): Promise<Vinyl[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.post(`${apiUrl}/vinyl`, body).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  updateVinyl(id: number, body: any): Promise<Vinyl[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .patch(`${apiUrl}/vinyl/${id}`, body)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  getRestaurantInfo(): Promise<Restaurant[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/restaurant-info`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  postRestaurantInfo(body: any): Promise<Restaurant[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .post(`${apiUrl}/restaurant-info`, body)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  updateRestaurantInfo(id: number, body: any): Promise<Restaurant[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .patch(`${apiUrl}/restaurant-info/${id}`, body)
        .subscribe({
          next: (res: any) => {
            resolve(res.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  deleteExtraFood(id: number): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .delete(`${apiUrl}/extra-food/${id}`)
        .subscribe({
          next: (res: any) => {
            resolve(true);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }
  
  deleteCategory(id: number): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .delete(`${apiUrl}/categories/${id}`)
        .subscribe({
          next: (res: any) => {
            resolve(true);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  deleteIngredient(id: number): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .delete(`${apiUrl}/ingredients/${id}`)
        .subscribe({
          next: (res: any) => {
            resolve(true);
          },
          error: (error: any) => {
            reject(error);
          },
        });
    });
  }

  unsubscribe() {
    this.subs.unsubscribe;
  }
}
