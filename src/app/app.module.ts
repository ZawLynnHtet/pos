import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
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
import { ReservationsComponent } from './reservations/reservations.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservDetailsComponent } from './reserv-details/reserv-details.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
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
import { TablesComponent } from './waitstaff/tables/tables.component';
import { MenuComponent } from './waitstaff/order-menus/menu.component';
import { AdminComponent } from './manager/admin/admin.component';
import { NgxPrintModule } from 'ngx-print';
import { OrderInfosComponent } from './waitstaff/order-infos/order-infos.component';
import { MatChipsModule } from '@angular/material/chips';
import { InfoDetailsComponent } from './waitstaff/info-details/info-details.component';

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
    NgxPrintModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
