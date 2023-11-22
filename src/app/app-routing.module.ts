import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TablesComponent } from './tables/tables.component';
import { MenuComponent } from './menus/menu.component';
import { AuthComponent } from './auth/auth.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { ReservDetailsComponent } from './reserv-details/reserv-details.component';
import { ToppingComponent } from './topping/topping.component';
import { AddMenusComponent } from './settings/add-menus/add-menus.component';
import { AddEmployeesComponent } from './settings/add-employees/add-employees.component';
import { AddNewMenuComponent } from './menu/add-new-menu/add-new-menu.component';
import { AllMenuComponent } from './menu/all-menu/all-menu.component';
import { MenuInfoDetailComponent } from './menu/menu-info-detail/menu-info-detail.component';
import { AddNewStaffComponent } from './staff/add-new-staff/add-new-staff.component';
import { AllStaffComponent } from './staff/all-staff/all-staff.component';
import { StaffInfoDetailComponent } from './staff/staff-info-detail/staff-info-detail.component';

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
  { path: 'staffs', component: AllStaffComponent },
  { path: 'new-staff', component: AddNewStaffComponent },
  { path: 'staffs/:id', component: StaffInfoDetailComponent },
  { path: 'all-menus', component: AllMenuComponent },
  { path: 'new-menu', component: AddNewMenuComponent },
  { path: 'menus/:id', component: MenuInfoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
