import { Injectable } from '@angular/core';
import { Action, Select, Selector, State, StateContext } from '@ngxs/store';
import { map, tap } from 'rxjs';
import { AppService } from '../service/app.service';
import { GetCheckDataByIdAction, GetEmployeesAction, GetEmplyeeByIdAction } from './employee.actions';
export interface EmployeesModel {
    employees: any[];
    checkData: any;
  }

@State<EmployeesModel>({
    name: 'employees',
    defaults: {
        employees: [],
        checkData: null
    }
  })
  @Injectable()
  export class EmployeesState {
    constructor(private svc: AppService){}

    @Selector()
      static selectEmployees(state: EmployeesModel) {
        return state.employees
      };

    @Action(GetEmployeesAction)
    employees(ctx: StateContext<any>, action: GetEmplyeeByIdAction) {
        return this.svc.getEmplpyees().pipe(
          tap(employees => {
            console.log(employees)
            const state = ctx.getState();
            ctx.setState({
              ...state,
              employees: [...state.employees, employees]
            })
          }),
          map((res: any[]) => {
            console.log(res);
            return res;
          })
        );
      }
      @Action(GetCheckDataByIdAction)
      employeesByID(ctx: StateContext<any>, action: GetCheckDataByIdAction) {
          return this.svc.getEmplpyeebyId(action.id).pipe(
            tap(employees => {
              const state = ctx.getState();
              ctx.setState({
                ...state,
                checkData: {...state.employees, employees}
              });
            })
          );
        }
  }