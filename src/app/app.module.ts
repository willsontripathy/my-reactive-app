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

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmpTwoComponent,
    EmployeeDetailComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
