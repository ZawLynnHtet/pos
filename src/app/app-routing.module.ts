import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './supervisor/order-details/order-details.component';
import { AuthComponent } from './auth/auth.component';
import { PaymentDetailsComponent } from './supervisor/payment-details/payment-details.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ReservDetailsComponent } from './supervisor/reserv-details/reserv-details.component';
import { MenuComponent } from './waitstaff/order-menus/menu.component';
import { MenusComponent } from './manager/menus/menus.component';
import { EmployeesComponent } from './manager/employees/employees.component';
import { AddMenusComponent } from './manager/add-menus/add-menus.component';
import { DashboardComponent } from './manager/dashboard/dashboard.component';
import { TablesComponent } from './waitstaff/tables/tables.component';
import { OrderInfosComponent } from './waitstaff/order-infos/order-infos.component';
import { InfoDetailsComponent } from './waitstaff/info-details/info-details.component';
import { PaymentComponent } from './waitstaff/payment/payment.component';
import { TablesPageComponent } from './manager/tables-page/tables-page.component';
import { OrderListComponent } from './supervisor/order-list/order-list.component';
import { NewReservationComponent } from './supervisor/new-reservation/new-reservation.component';
import { ReservationsComponent } from './supervisor/reservations/reservations.component';
import { KitchenComponent } from './supervisor/kitchen/kitchen.component';
import { EachOrderDetailsComponent } from './waitstaff/each-order-details/each-order-details.component';
import { SettingsComponent } from './manager/settings/settings.component';

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
    path: 'tables/:id/order-details',
    component: OrderDetailsComponent,
  },
  {
    path: 'order-infos',
    component: OrderInfosComponent,
  },
  {
    path: 'order-infos/:orderId/:tableId/details',
    component: InfoDetailsComponent,
  },
  {
    path: 'order-infos/:tableId/details',
    component: InfoDetailsComponent,
  },
  {
    path: 'order-lists',
    component: OrderListComponent,
  },
  {
    path: 'message/:msgId/table/:id/order/:oid/bills',
    component: PaymentDetailsComponent,
  },
  {
    path: ':tableId/:orderId/payments',
    component: PaymentComponent,
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
    path: 'message/:msgId/table/:id/order/:oid/kitchen',
    component: KitchenComponent,
  },
  {
    path: 'tables-page',
    component: TablesPageComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'order-infos/table/:tid/order/:oid/each-order-details',
    component: EachOrderDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
