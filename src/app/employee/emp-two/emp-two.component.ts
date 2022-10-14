import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WKAuditModuleType } from '../license-type';

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
  getformcontroltoDisable(productId: number): AbstractControl | null {
    return (this.formarray.controls.findIndex(x => x.value.productId === productId) !== -1) ?
      this.formarray.at(this.formarray.controls.findIndex(x => x.value.productId === productId)) : null;
  }
  onEnableDisableControl(group: any, event: any) {
    switch (group.value.productId) {
      case WKAuditModuleType.FinancialPrep:
        (event.target.checked) ? ((this.getformcontroltoDisable(WKAuditModuleType.AxcessEngagement)) ?
         (<AbstractControl>this.getformcontroltoDisable(WKAuditModuleType.AxcessEngagement)).get('disabled')?.patchValue(true) : '',
          (this.getformcontroltoDisable(WKAuditModuleType.AxcessKC)) ? 
          (<AbstractControl>this.getformcontroltoDisable(WKAuditModuleType.AxcessKC)).get('disabled')?.patchValue(true) : '') : 
          this.formarray.controls.map(x => x.get('disabled')?.patchValue(false));
        break;
      case WKAuditModuleType.AxcessEngagement:
      case WKAuditModuleType.AxcessKC:
        (event.target.checked) ? (this.getformcontroltoDisable(WKAuditModuleType.FinancialPrep)) ? (<AbstractControl>this.getformcontroltoDisable(WKAuditModuleType.FinancialPrep)).get('disabled')?.patchValue(true) : '' :
          ((this.getformcontroltoDisable(WKAuditModuleType.AxcessEngagement) && this.getformcontroltoDisable(WKAuditModuleType.AxcessEngagement)?.value.selected) || 
          (this.getformcontroltoDisable(WKAuditModuleType.AxcessKC) && 
          this.getformcontroltoDisable(WKAuditModuleType.AxcessKC)?.value.selected)) ? 
          (this.getformcontroltoDisable(WKAuditModuleType.FinancialPrep)) ? 
          (<AbstractControl>this.getformcontroltoDisable(WKAuditModuleType.FinancialPrep)).get('disabled')?.patchValue(true) : ''
           : this.formarray.controls.map(x => x.get('disabled')?.patchValue(false));;

    }
  }
  // Pure Reactive form
  // onEnableDisableControl(group: any, event: any) {
  //   switch (group.value.productId) {
  //     case WKAuditModuleType.FinancialPrep:
  //       (event.target.checked) ? ((this.getformcontroltoDisable(WKAuditModuleType.AxcessEngagement)) ?
  //        (<AbstractControl>this.getformcontroltoDisable(WKAuditModuleType.AxcessEngagement)).get('selected')?.disable() : '',
  //         (this.getformcontroltoDisable(WKAuditModuleType.AxcessKC)) ? 
  //         (<AbstractControl>this.getformcontroltoDisable(WKAuditModuleType.AxcessKC)).get('selected')?.disable() : '') : 
  //         this.formarray.controls.map(x => x.get('selected')?.enable());
  //       break;
  //     case WKAuditModuleType.AxcessEngagement:
  //     case WKAuditModuleType.AxcessKC:
  //       (event.target.checked) ? (this.getformcontroltoDisable(WKAuditModuleType.FinancialPrep)) ? 
  //       (<AbstractControl>this.getformcontroltoDisable(WKAuditModuleType.FinancialPrep)).get('selected')?.disable() : '' :
  //         ((this.getformcontroltoDisable(WKAuditModuleType.AxcessEngagement) && 
  //         this.getformcontroltoDisable(WKAuditModuleType.AxcessEngagement)?.value.selected) || 
  //         (this.getformcontroltoDisable(WKAuditModuleType.AxcessKC) && 
  //         this.getformcontroltoDisable(WKAuditModuleType.AxcessKC)?.value.selected)) ? 
  //         (this.getformcontroltoDisable(WKAuditModuleType.FinancialPrep)) ? 
  //         (<AbstractControl>this.getformcontroltoDisable(WKAuditModuleType.FinancialPrep)).get('selected')?.disable() : ''
  //          : this.formarray.controls.map(x => x.get('selected')?.enable());;

  //   }
  // }
  writeValue(obj: any): void {
    if (obj) {
      this.formarray = new FormArray(
        obj.map((x: any) => {
          return new FormGroup({
            productId: new FormControl(x.productId),
            name: new FormControl(x.name),
            selected: new FormControl( x.selected),
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
