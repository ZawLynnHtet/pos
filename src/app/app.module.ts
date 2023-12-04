import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
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
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeesComponent } from './manager/add-employees/add-employees.component';
import { MatRadioModule } from '@angular/material/radio';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { MenuComponent } from './order-menus/menu.component';
import { MenusComponent } from './manager/menus/menus.component';
import { EmployeesComponent } from './manager/employees/employees.component';
import { AddMenusComponent } from './manager/add-menus/add-menus/add-menus.component';

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
    AddEmployeesComponent,
    AppComponent,
    MenusComponent,
    EmployeesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
