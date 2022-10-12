import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, delay } from 'rxjs';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  formInitStatus: boolean = false;
  constructor(private svc: AppService, private ar: ActivatedRoute, private fb: FormBuilder) { }

  form!: FormGroup;
  get getName() {
    return this.form?.get('name');
  }
  dbdata: any[] = [
    { name: "FP Engagment" },
    { name: "AE Engagement" },
    { name: "KC Engagment" }
  ]
  ngOnInit(): void {
    const par = this.ar.snapshot.paramMap?.get('id');
    const id = par ? +par : 0;

    combineLatest([this.svc.getEmplpyeebyId(id), this.svc.getCheckData()])
      .subscribe((res: any[]) => {
        this.formInitStatus = true;
        this.form = this.fb.group({
          id: [res[0].ID],
          name: [res[0].name],
          gender: [res[0].Gender],
          empType: [null],
          chkdata2: [res[1].map((x: any) => ({ ...x, disabled: false }))],
          chkdata: [this.getFormattedFormArray(res[0].chkData, this.dbdata)],
          chkdata1: new FormControl([])
        })
        // console.log(this.getName)
        // this.form.setValue({
        //   id: res[0].ID,
        //   name: res[0].name,
        //   gender: res[0].Gender,
        //   chkdata: res[1]
        // })
      })
    // console.log(this.getName)
    // this.svc.getEmplpyeebyId(id).subscribe((res: any) => {
    //     this.form.setValue({
    //     id: res.ID,
    //     name: res.name,
    //     gender: res.Gender,
    //     chkdata: res.chkData.map((x:any) => {
    //       return {...x, disabled:true}
    //     }),
    //     chkdata1: res.chkData.map((x: any) => {
    //       return {...x, selected:false, disabled:false}
    //     })
    //   })
    // })
  }
  getFormattedFormArray(res: any[], dbdata: any[]): any {
    // const formatedData = [...dbdata.filter(d => res.map(x => x.name).includes(d.name)).map(x => ({ ...x, selected: true, disabled: true })),
    //                       ...dbdata.filter(d => !res.map(x => x.name).includes(d.name)).map(x => ({ ...x, selected: false, disabled: false }))]
    const data = dbdata.map(db => (res.find(x => x.name === db.name)) ? ({...db, selected: true, disabled: true})
         : ({...db, selected: false, disabled: false}))
    const selectedEng = data.filter((x:any) => x.selected);
    let result;
    if(selectedEng.length && (selectedEng.some((x: any) => x.name === 'AE Engagement' || x.name == 'KC Engagment'))){
      result = data.map((x: any) => (x.name === 'FP Engagment') ? ({...x, disabled: true}): ({...x}))
    } else if(selectedEng.length && selectedEng.some((X: any) => X.name === 'FP Engagment')){
      result = data.map((x: any) => ({...x, disabled: true}))
    } else {
      result = data.map((x: any) => ({...x, disabled: false}));
    }
  
    console.log(result);
    return result?.sort((a, b) => dbdata.map(x => x.name).indexOf(a.name) - dbdata.map(x => x.name).indexOf(b.name));
  }
}
