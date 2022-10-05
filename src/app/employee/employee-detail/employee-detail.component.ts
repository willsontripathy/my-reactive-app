import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  
  constructor(private svc: AppService, private ar: ActivatedRoute, private fb: FormBuilder) { }
form: FormGroup = this.fb.group({
  id: [''],
  name: [''],
  gender: [''],
  chkdata: new FormControl([]),
  chkdata1: new FormControl([])
})
  ngOnInit(): void {
    const par = this.ar.snapshot.paramMap?.get('id');
    const id = par ? +par:0;

    // combineLatest([this.svc.getEmplpyeebyId(id), this.svc.getCheckData()]).subscribe((res: any[]) => {
    //   this.form.setValue({
    //     id: res[0].ID,
    //     name: res[0].name,
    //     gender: res[0].Gender,
    //     chkdata: res[1]
    //   })
    // })
    this.svc.getEmplpyeebyId(id).subscribe((res: any) => {
        this.form.setValue({
        id: res.ID,
        name: res.name,
        gender: res.Gender,
        chkdata: res.chkData.map((x:any) => {
          return {...x, disabled:true}
        }),
        chkdata1: res.chkData.map((x: any) => {
          return {...x, selected:false, disabled:false}
        })
      })
    })
  }

}
