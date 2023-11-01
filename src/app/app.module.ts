import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MenuComponent } from './menu/menu.component';
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
import { OrderReportComponent } from './order-report/order-report.component';
import { MatTableModule } from '@angular/material/table';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { ReservationsComponent } from './reservations/reservations.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservDetailsComponent } from './reserv-details/reserv-details.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { ToppingComponent } from './topping/topping.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { AddMenusComponent } from './settings/add-menus/add-menus.component';
import { AddEmployeesComponent } from './settings/add-employees/add-employees.component';

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    OrderDetailsComponent,
    MenuComponent,
    OrderReportComponent,
    AuthComponent,
    OrderListComponent,
    PaymentDetailsComponent,
    ReservationsComponent,
    SidenavComponent,
    NewReservationComponent,
    ReservDetailsComponent,
    ToppingComponent,
    AddMenusComponent,
    AddEmployeesComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
