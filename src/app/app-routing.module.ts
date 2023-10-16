import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TablesComponent } from './tables/tables.component';
import { MenuComponent } from './menu/menu.component';
import { OrderReportComponent } from './order-report/order-report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tables',
    pathMatch: 'full',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
