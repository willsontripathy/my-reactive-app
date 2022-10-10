import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeDetail: any[] = [];
  constructor(private svc: AppService) { }

  ngOnInit(): void {
    this.svc.getEmplpyees().subscribe((data: any[]) => {
      this.employeeDetail = data;
    })
    of(null,1,2,3).pipe(filter(x => x != null)).subscribe(d => console.log(d))

  }
  onClick(event: any, id: number){
    event.stopPropagation();
  }
}
