import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/utils/constants';
import { OverallResponse, Table } from '../models/table.model';
import { SubSink } from 'subsink/dist/subsink';
import { Order } from '../models/order.model';
import { OrderDetails } from '../models/orderdetails.model';
import { Category } from '../models/category.model';
import { Menu } from '../models/menu.model';
import { Reservation } from '../models/reservation.model';
import { Bill } from '../models/bill.model';
import { ExtraFood } from '../models/extrafood.model';
import { Ingredient } from '../models/ingredient.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private subs = new SubSink();

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

  getAllOrdersWithTableId(
    id: number,
    submitted: boolean
  ): Promise<OrderDetails[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http
        .get(`${apiUrl}/orders/table/${id}?submitted=${submitted}`)
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

  getAllOrderdetailsWithOrderId(id: number): Promise<OrderDetails[]> {
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

  addOrders(data: Order): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      this.http.post(`${apiUrl}/orders`, data);
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

  unsubscribe() {
    this.subs.unsubscribe;
  }
}
