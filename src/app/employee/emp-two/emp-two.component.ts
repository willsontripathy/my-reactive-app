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
  onChangeCheckbox(group: any, i: number, event: any) {
    this.onEnableDisableControl(group, event);
    // this.onChange(this.formarray.value);
  }
  getformcontroltoDisable(name: string): AbstractControl | null {
    return (this.formarray.controls.findIndex(x => x.value.name === name) !== -1) ?
      this.formarray.at(this.formarray.controls.findIndex(x => x.value.name === name)) : null;
  }
  onEnableDisableControl(group: any, event: any) {
    switch (group.value.name) {
      case 'FP Engagment':
        (event.target.checked) ? ((this.getformcontroltoDisable('AE Engagement')) ? (<AbstractControl>this.getformcontroltoDisable('AE Engagement')).get('disabled')?.patchValue(true) : '',
          (this.getformcontroltoDisable('KC Engagment')) ? (<AbstractControl>this.getformcontroltoDisable('KC Engagment')).get('disabled')?.patchValue(true) : '') : this.formarray.controls.map(x => x.get('disabled')?.patchValue(false));
        break;
      case 'AE Engagement':
      case 'KC Engagment':
        (event.target.checked) ? (this.getformcontroltoDisable('FP Engagment')) ? (<AbstractControl>this.getformcontroltoDisable('FP Engagment')).get('disabled')?.patchValue(true) : '' :
          ((this.getformcontroltoDisable('AE Engagement') && this.getformcontroltoDisable('AE Engagement')?.value.selected) || (this.getformcontroltoDisable('KC Engagment') && this.getformcontroltoDisable('KC Engagment')?.value.selected)) ? (this.getformcontroltoDisable('FP Engagment')) ? (<AbstractControl>this.getformcontroltoDisable('FP Engagment')).get('disabled')?.patchValue(true) : '' : this.formarray.controls.map(x => x.get('disabled')?.patchValue(false));;

    }
  }
  writeValue(obj: any): void {
    if (obj) {
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
  }
  registerOnChange(fn: any): void {
    // alert('okk');
    this.formarray.valueChanges.subscribe(fn );
    // this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    //throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    //throw new Error('Method not implemented.');
  }

}
