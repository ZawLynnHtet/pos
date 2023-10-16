import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TablesComponent } from './tables/tables.component';
import { MenuComponent } from './menu/menu.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { AuthComponent } from './auth/auth.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tables',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent
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
    path: 'orders',
    component: OrderDetailsComponent,
  },
  {
    path: 'order-reports',
    component: OrderReportComponent,
  },
  {
    path: 'tables/:id',
    component: OrderDetailsComponent
  },
  {
    path: 'tables/:id/payments/:oid',
    component: PaymentDetailsComponent
  },
  {
    path: 'reservations',
    component: ReservationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
