import { Component, OnInit } from '@angular/core';
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
  }
  onClick(event: any, id: number){
    event.stopPropagation();
  }
}
