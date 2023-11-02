import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/utils/constants';
import { OverallResponse, Table } from '../models/table.model';
import { SubSink } from 'subsink/dist/subsink';
import { Order } from '../models/order.model';
import { OrderDetails } from '../models/orderdetails.model';
import { Categories } from '../models/category.model';
import { Employees } from '../models/waiter.model';

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

  getEmployee(): Promise<Employees[]> {
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

  registerEmployee(data: any) {
    return this.http.post(`${apiUrl}/employees/register`, data);
  }

  loginEmployee(data: any) {
    return this.http.post(`${apiUrl}/employees/login`, data);
  }

  getAllOrdersWithTableId(id: number): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      this.subs.sink = this.http.get(`${apiUrl}/orders/table/${id}`).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  getAllOrderdetailssWithOrderId(id: number): Promise<OrderDetails[]> {
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

  getAllCategories(): Promise<Categories[]> {
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
}
