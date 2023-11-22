import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MenuComponent } from './menus/menu.component';
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
import { ToppingComponent } from './topping/topping.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { AddMenusComponent } from './settings/add-menus/add-menus.component';
import { AddEmployeesComponent } from './settings/add-employees/add-employees.component';
import { MatRadioModule } from '@angular/material/radio';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { AddNewMenuComponent } from './menu/add-new-menu/add-new-menu.component';
import { AllMenuComponent } from './menu/all-menu/all-menu.component';
import { BreakfastComponent } from './menu/all-menu/menu-main/breakfast/breakfast.component';
import { DinnerComponent } from './menu/all-menu/menu-main/dinner/dinner.component';
import { DrinksComponent } from './menu/all-menu/menu-main/drinks/drinks.component';
import { LunchComponent } from './menu/all-menu/menu-main/lunch/lunch.component';
import { MenuMainComponent } from './menu/all-menu/menu-main/menu-main.component';
import { PopularDishesComponent } from './menu/all-menu/menu-main/popular-dishes/popular-dishes.component';
import { SnacksComponent } from './menu/all-menu/menu-main/snacks/snacks.component';
import { TraditionalComponent } from './menu/all-menu/menu-main/traditional/traditional.component';
import { UnpopularDishesComponent } from './menu/all-menu/menu-main/unpopular-dishes/unpopular-dishes.component';
import { MenuTopbarComponent } from './menu/all-menu/menu-topbar/menu-topbar.component';
import { EditMenuComponent } from './menu/edit-menu/edit-menu.component';
import { MenuInfoDetailComponent } from './menu/menu-info-detail/menu-info-detail.component';
import { AddNewStaffComponent } from './staff/add-new-staff/add-new-staff.component';
import { AllStaffComponent } from './staff/all-staff/all-staff.component';
import { MainComponent } from './staff/all-staff/main/main.component';
import { ManagerComponent } from './staff/all-staff/main/manager/manager.component';
import { SupervisorComponent } from './staff/all-staff/main/supervisor/supervisor.component';
import { CardComponent } from './staff/all-staff/main/utils/card/card.component';
import { WaitStaffComponent } from './staff/all-staff/main/wait-staff/wait-staff.component';
import { SidebarComponent } from './staff/all-staff/sidebar/sidebar.component';
import { TopbarComponent } from './staff/all-staff/topbar/topbar.component';
import { StaffInfoDetailComponent } from './staff/staff-info-detail/staff-info-detail.component';

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
    ToppingComponent,
    AddMenusComponent,
    AddEmployeesComponent,
    AppComponent,
    AllStaffComponent,
    SidebarComponent,
    TopbarComponent,
    MainComponent,
    ManagerComponent,
    SupervisorComponent,
    WaitStaffComponent,
    CardComponent,
    AddNewStaffComponent,
    StaffInfoDetailComponent,
    AllMenuComponent,
    MenuTopbarComponent,
    MenuMainComponent,
    PopularDishesComponent,
    UnpopularDishesComponent,
    BreakfastComponent,
    LunchComponent,
    DinnerComponent,
    TraditionalComponent,
    SnacksComponent,
    DrinksComponent,
    EditMenuComponent,
    MenuInfoDetailComponent,
    AddNewMenuComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
