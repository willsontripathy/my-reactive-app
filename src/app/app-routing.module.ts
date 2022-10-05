import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmpTwoComponent } from './employee/emp-two/emp-two.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee/employee.component';

const routes: Routes = [
  {path: '', component: EmployeeListComponent},
  {path: 'emp/:id', component: EmployeeDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
