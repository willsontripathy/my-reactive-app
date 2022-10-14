import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { map, Observable, tap } from "rxjs";
import { GetEmployeesAction } from "../store/employee.actions";
import { EmployeesState } from "../store/employees.state";



@Injectable({
    providedIn: 'root'
})
export class AppRouteResolver implements Resolve<any> {
    @Select(EmployeesState.selectEmployees) selectEmployee$!: Observable<any[]>
    constructor(private store: Store){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.dispatch(new GetEmployeesAction()).pipe(
            map(() => this.store.selectSnapshot(EmployeesState.selectEmployees))
          );
    }
}