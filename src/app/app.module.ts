import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { OrderDetailsComponent } from './supervisor/order-details/order-details.component';
import { OrderListComponent } from './supervisor/order-list/order-list.component';
import { PaymentDetailsComponent } from './supervisor/payment-details/payment-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservDetailsComponent } from './supervisor/reserv-details/reserv-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { MenusComponent } from './manager/menus/menus.component';
import { EmployeesComponent } from './manager/employees/employees.component';
import { AddMenusComponent } from './manager/add-menus/add-menus.component';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from 'src/config/firebase.config';
import { MatDialogModule } from '@angular/material/dialog';
import { EditEmployeeComponent } from './manager/edit-employee/edit-employee.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './manager/dashboard/dashboard.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MenuComponent } from './waitstaff/order-menus/menu.component';
import { AdminComponent } from './manager/admin/admin.component';
import { OrderInfosComponent } from './waitstaff/order-infos/order-infos.component';
import { InfoDetailsComponent } from './waitstaff/info-details/info-details.component';
import { PaymentComponent } from './waitstaff/payment/payment.component';
import { TablesComponent } from './waitstaff/tables/tables.component';
import { TableFormDialogComponent } from './manager/table-form-dialog/table-form-dialog.component';
import { TablesPageComponent } from './manager/tables-page/tables-page.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NewReservationComponent } from './supervisor/new-reservation/new-reservation.component';
import { ReservationsComponent } from './supervisor/reservations/reservations.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ToolbarComponent } from './supervisor/toolbar/toolbar.component';
import { KitchenComponent } from './supervisor/kitchen/kitchen.component';
import { BillSlipComponent } from './supervisor/bill-slip/bill-slip.component';

const config: SocketIoConfig = {
  url: 'https://restaurant-pos-databse.onrender.com',
  options: {
    transports: ['websocket'],
  },
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    OrderDetailsComponent,
    MenuComponent,
    AuthComponent,
    OrderListComponent,
    PaymentDetailsComponent,
    ReservationsComponent,
    SidenavComponent,
    NewReservationComponent,
    ReservDetailsComponent,
    AddMenusComponent,
    AppComponent,
    MenusComponent,
    EmployeesComponent,
    EditEmployeeComponent,
    DashboardComponent,
    AdminComponent,
    OrderInfosComponent,
    InfoDetailsComponent,
    PaymentComponent,
    TableFormDialogComponent,
    TablesPageComponent,
    ToolbarComponent,
    KitchenComponent,
    BillSlipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatOptionModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    MatRadioModule,
    FilterPipeModule,
    OrderModule,
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    BrowserModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  // constructor() {
  //   window.onscroll = () => {
  //     let header = document.querySelector('.header');
  //     header?.classList.toggle('sticky', window.scrollY > 10);
  //   };
  // }
}
