import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-emp-two',
  templateUrl: './emp-two.component.html',
  styleUrls: ['./emp-two.component.css'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: EmpTwoComponent,
        multi: true
    },
  ]
})
export class EmpTwoComponent implements OnInit, ControlValueAccessor {
  formarray!: FormArray;
  public onChange!: (value: any) => void;
  
  constructor() { }
  
  ngOnInit(): void {
  }
  onChangeCheckbox(group:any, i:number, event:any){
    this.onEnableDisableControl(group, event);
    this.onChange(this.formarray.value);
  }
  getformcontroltoDisable(name: string): AbstractControl | null{
    return (this.formarray.controls.findIndex(x => x.value.name === name) !== -1) ? 
             this.formarray.at(this.formarray.controls.findIndex(x => x.value.name === name)) : null;
  }
  onEnableDisableControl(group: any, event: any){
    switch(group.value.name){
      case 'checkbox1':
        (event.target.checked) ? ((this.getformcontroltoDisable('checkbox2'))? (<AbstractControl>this.getformcontroltoDisable('checkbox2')).get('disabled')?.patchValue(true) : '',
        (this.getformcontroltoDisable('checkbox3'))? (<AbstractControl>this.getformcontroltoDisable('checkbox3')).get('disabled')?.patchValue(true) : '') : this.formarray.controls.map(x => x.get('disabled')?.patchValue(false));
        break;
      case 'checkbox2':
      case 'checkbox3':
        (event.target.checked) ? (this.getformcontroltoDisable('checkbox1'))? (<AbstractControl>this.getformcontroltoDisable('checkbox1')).get('disabled')?.patchValue(true) : '' :
              ((this.getformcontroltoDisable('checkbox2') && this.getformcontroltoDisable('checkbox2')?.value.selected) || (this.getformcontroltoDisable('checkbox3') && this.getformcontroltoDisable('checkbox3')?.value.selected)) ? (this.getformcontroltoDisable('checkbox1')) ? (<AbstractControl>this.getformcontroltoDisable('checkbox1')).get('disabled')?.patchValue(true) : '' : this.formarray.controls.map(x => x.get('disabled')?.patchValue(false));;
      
    }
  }
  writeValue(obj: any): void {
    this.formarray = new FormArray(
      obj.map((x: any) => {
        return new FormGroup({
          name: new FormControl(x.name),
          selected: new FormControl(x.selected),
          disabled: new FormControl(x.disabled)
        });
      })
    );
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    //throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    //throw new Error('Method not implemented.');
  }

}
