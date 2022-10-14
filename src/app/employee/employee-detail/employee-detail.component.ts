import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, concatMap, delay, forkJoin, map } from 'rxjs';
import { AppService } from 'src/app/service/app.service';
import { Store } from '@ngxs/store';
import { GetCheckDataByIdAction } from 'src/app/store/employee.actions';
import { WKAuditModuleType } from '../license-type';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  formInitStatus: boolean = false;
  constructor(private svc: AppService, private ar: ActivatedRoute, private fb: FormBuilder, 
    private store: Store) { }

  form!: FormGroup;
  get getName() {
    return this.form?.get('name');
  }
  dbdata: any[] = [
    { productId: 67,name: "FP Engagment", },
    { productId: 79,name: "AE Engagement" },
    { productId: 76,name: "KC Engagment" }
  ]
  ngOnInit(): void {
    this.ar.data.subscribe(res => {
      console.log(res);
    })
    const par = this.ar.snapshot.paramMap?.get('id');
    const id = par ? +par : 0;

    this.svc.getEmplpyeebyId(id)
    .pipe(
      concatMap((x: any) => {
        const chkdata$ = x.chkData.map((y: any) => {
          return this.store.dispatch(new GetCheckDataByIdAction(y.id))
        });
        return forkJoin(chkdata$)
      })
    ).subscribe(val => console.log(val))

    combineLatest([this.svc.getEmplpyeebyId(id), this.svc.getCheckData()])
      .subscribe((res: any[]) => {
        this.formInitStatus = true;
        this.form = this.fb.group({
          id: [res[0].ID],
          name: [res[0].name],
          gender: [res[0].Gender],
          empType: [null],
          chkdata2: [res[1].map((x: any) => ({ ...x, disabled: false }))],
          // chkdata: [this.getFormattedFormArray(res[0].chkData, this.dbdata)],
          chkdata: [this.dbdata.map((x: any) => ({...x, disabled: false, selected: false}))],
          chkdata1: new FormControl(this.getFormattedFormArray(res[0].chkData, this.dbdata))
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
    return dbdata.map(db => (res.find(x => x.productId === db.productId)) ? ({...db, selected: true, disabled: true})
         : ({...db, selected: false, disabled: true}))
    // const selectedEng = data.filter((x:any) => x.selected);
    // let result;
    // if(selectedEng.length && (selectedEng.some((x: any) => x.productId === WKAuditModuleType.AxcessEngagement || 
    // x.productId == WKAuditModuleType.AxcessKC))){
    //   result = data.map((x: any) => (x.productId === WKAuditModuleType.FinancialPrep) ? ({...x, disabled: true}): ({...x}))
    // } else if(selectedEng.length && selectedEng.some((X: any) => X.productId === WKAuditModuleType.FinancialPrep)){
    //   result = data.map((x: any) => ({...x, disabled: true}))
    // } else {
    //   result = data.map((x: any) => ({...x, disabled: false}));
    // }
  
    // console.log(result);
    // return result?.sort((a, b) => dbdata.map(x => x.productId).indexOf(a.productId) - 
    // dbdata.map(x => x.productId).indexOf(b.productId));BHhhhhhhhhhhhh  chhhhhhhhhhhhcgh      gggggggggggggg                                                                            
  }
}
