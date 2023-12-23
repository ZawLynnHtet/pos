import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AuthComponent } from './auth/auth.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { ReservDetailsComponent } from './reserv-details/reserv-details.component';
import { MenuComponent } from './waitstaff/order-menus/menu.component';
import { MenusComponent } from './manager/menus/menus.component';
import { EmployeesComponent } from './manager/employees/employees.component';
import { AddMenusComponent } from './manager/add-menus/add-menus.component';
import { DashboardComponent } from './manager/dashboard/dashboard.component';
import { TablesComponent } from './waitstaff/tables/tables.component';
import { AdminComponent } from './manager/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'sidenav',
    component: SidenavComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'tables',
    component: TablesComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'tables/:id/:tableIndex/menu',
    component: MenuComponent,
  },
  {
    path: 'tables/:id/menu',
    component: MenuComponent,
  },
  {
    path: 'menus',
    component: MenusComponent,
  },
  {
    path: 'orders',
    component: OrderDetailsComponent,
  },
  {
    path: 'tables/:id/:index/order-infos',
    component: OrderDetailsComponent,
  },
  {
    path: 'tables/:id/:index/order-infos/payments/:oid',
    component: PaymentDetailsComponent,
  },
  {
    path: 'reservations',
    component: ReservationsComponent,
  },
  {
    path: 'reservations/new',
    component: NewReservationComponent,
  },
  {
    path: 'reservations/:reservId',
    component: ReservDetailsComponent,
  },
  {
    path: 'menus/add-menus',
    component: AddMenusComponent,
  },
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
