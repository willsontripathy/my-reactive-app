import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: EmployeeComponent,
        multi: true
    },
  ]
})
export class EmployeeComponent implements OnInit {
  // form: FormGroup = this.fb.group({
  //    dd: new FormControl(''),
  //    datas: this.fb.array([])
  // });
  // data: any[] = [{ name:'d1', d1: true,  value: 12},{ name:'d2', d1:true,  value: 13}, { name:'d3', d1: false, value: 14}]
  // data1 = ['will','nel','xxx'];
  @Input() formarray!: FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.data.map(x => {
    //   (this.form.get('datas') as FormArray).push(this.fb.group({
    //     name: new FormControl(false),
    //     checked: new FormControl(x.d1),
    //     value: new FormControl(x.value)
    //   }))
    // })
  }
  onChange(data: FormGroup, i: number, event:any) {
    // this.formarray.at(this.formarray.controls.findIndex(x => x.value.value === 13)).get('checked')?.disable();
    if (event.target.checked) {
      if (data.value.value === 12) {
        // this.formarray.at(this.formarray.controls.findIndex(x => x.value.value === 13)).disable();
        // this.formarray.at(this.formarray.controls.findIndex(x => x.value.value === 14)).disable();
        (this.getformcontroltoDisable(13))? (<AbstractControl>this.getformcontroltoDisable(13)).get('disabled')?.patchValue(true) : '';
        (this.getformcontroltoDisable(14))? (<AbstractControl>this.getformcontroltoDisable(14)).get('disabled')?.patchValue(true) : '';
      } else if (data.value.value === 13 || data.value.value === 14) {
        // console.log(this.formarray.controls.findIndex(x => x.value.value === 12))
        // (this.formarray.controls.findIndex(x => x.value.value === 12) !== -1)?
        // this.formarray.at(this.formarray.controls.findIndex(x => x.value.value === 12)).disable(): '';
        (this.getformcontroltoDisable(12))? (<AbstractControl>this.getformcontroltoDisable(12)).get('disabled')?.patchValue(true) : '';
      }
    }else {
      if(data.value.value === 12){
      this.formarray.controls.map(x => x.get('disabled')?.patchValue(false));
      }else {
        (this.formarray.at(this.formarray.controls.findIndex(x => x.value.value === 13)).value.checked || 
        this.formarray.at(this.formarray.controls.findIndex(x => x.value.value === 14)).value.checked) ? 
        (this.getformcontroltoDisable(12)) ? (this.getformcontroltoDisable(12) as AbstractControl).get('disabled')?.patchValue(true): '' :
        this.formarray.controls.map(x => x.get('disabled')?.patchValue(false));
      }
    }
    console.log(i);
  }
  getformcontroltoDisable(id: number): AbstractControl | null{
    return (this.formarray.controls.findIndex(x => x.value.value === id) !== -1) ? 
             this.formarray.at(this.formarray.controls.findIndex(x => x.value.value === id)) : null;
  }
  // writeValue(obj: any): void {
  //   this.formarray = new FormArray(
  //     obj.map((x:any) => {
  //         return new FormGroup({
  //             name: new FormControl(x.name),
  //             value: new FormControl(x.value),
  //             checked: new FormControl(x.checked)
  //         });
  //     })
  // );
  // }
  // registerOnChange(fn: any): void {
  //   //throw new Error('Method not implemented.');
  // }
  // registerOnTouched(fn: any): void {
  //   //throw new Error('Method not implemented.');
  // }
  // setDisabledState?(isDisabled: boolean): void {
  //   //throw new Error('Method not implemented.');
  // }
}
