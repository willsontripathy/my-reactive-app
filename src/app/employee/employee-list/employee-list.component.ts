import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, of, throwError } from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppService } from 'src/app/service/app.service';
import { Store } from '@ngxs/store';
// import { GetEmployeesAction } from 'src/app/store/employee.actions';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeDetail: any[] = [];
  constructor(private svc: AppService, private store: Store) { }

  ngOnInit(): void {
    // this.store.dispatch(new GetEmployeesAction()).subscribe(val => console.log(val));
    this.svc.getEmplpyees().subscribe(data => this.employeeDetail = data);
    // this.svc.getEmplpyeebyId(3).pipe(
    //   tap((res) => console.log(res)),
    //   concatMap((x: any) => {
    //     // array of observables
    //     const members$ = x.chkData.map((y:any) => {
    //       console.log(y)
    //       return this.svc.getCheckDataByID(y.id);
    //     });
    
    //     // use forkJoin to return single observable that returns array of results
    //     return forkJoin(members$)
    //   })
    // ).subscribe((res: any) => {
    //   console.log(res)
    // })
    // of(null, 1, 2, 3).pipe(filter(x => x != null)).subscribe(d => console.log(d))

  }
  onClick(event: any, id: number) {
    event.stopPropagation();
  }
}
