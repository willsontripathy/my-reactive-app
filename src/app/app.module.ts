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

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmpTwoComponent,
    EmployeeDetailComponent,
    EmployeeListComponent,
    EmpThreeComponent,
    EmpFourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AbilityModule
  ],
  providers: [
    { provide: Ability, useValue: new Ability() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
