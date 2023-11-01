import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TablesComponent } from './tables/tables.component';
import { MenuComponent } from './menu/menu.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { AuthComponent } from './auth/auth.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { ReservDetailsComponent } from './reserv-details/reserv-details.component';
import { ToppingComponent } from './topping/topping.component';
import { AddMenusComponent } from './settings/add-menus/add-menus.component';
import { AddEmployeesComponent } from './settings/add-employees/add-employees.component';

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
    path: 'menus',
    component: MenuComponent,
  },
  {
    path: 'tables/:id/menus',
    component: MenuComponent,
  },
  {
    path: 'orders',
    component: OrderDetailsComponent,
  },
  {
    path: 'order-reports',
    component: OrderReportComponent,
  },
  {
    path: 'tables/:id',
    component: OrderDetailsComponent,
  },
  {
    path: 'tables/:id/payments/:oid',
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
    path: 'settings/add-menus',
    component: AddMenusComponent,
  },
  {
    path: 'settings/add-employees',
    component: AddEmployeesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
