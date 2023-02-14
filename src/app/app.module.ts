import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { EmpTwoComponent } from './employee/emp-two/emp-two.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmpThreeComponent } from './employee/emp-three/emp-three.component';
import { AbilityModule } from '@casl/angular';
import { Ability } from '@casl/ability';
import { AppAbility } from './app-ability';
import { EmpFourComponent } from './emp-four/emp-four.component';
import { NgxsModule } from '@ngxs/store';
import { EmployeesState } from './store/employees.state';
import { EmpInputComponent } from './employee/emp-input/emp-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import { AgGridModule } from 'ag-grid-angular';
import { CustomHeader } from './cust-header.componet';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmpTwoComponent,
    EmployeeDetailComponent,
    EmployeeListComponent,
    EmpThreeComponent,
    EmpFourComponent,
    EmpInputComponent,
    CustomHeader
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AbilityModule,
    NgxsModule.forRoot([EmployeesState]),
    BrowserAnimationsModule,
    MatChipsModule,
    MatCardModule,
    AgGridModule
  ],
  providers: [
    { provide: Ability, useValue: new Ability() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
