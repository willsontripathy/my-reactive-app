import { Component } from '@angular/core';
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
export class EmpTwoComponent implements  ControlValueAccessor {
  formarray!: FormArray;
  public onChange!: (value: any) => void;
  xyz: boolean = false;

  onChangeCheckbox(group: any, i: number, event: any) {
    let w =[1];
    let y = 1;
    let z = 2;
    let x = false;
    if(w.length > 0){
      this.xyz = y>z;
    }
    this.onEnableDisableControl(group, event);
  }
  abcd(y: number,z: number): boolean {
    if(y >= z){
      return true;
    } else {
      return false;
    }
  }
  getformcontroltoDisable(productId: number): AbstractControl | null {
    return (this.formarray.controls.findIndex(x => x.value.productId === productId) !== -1) ?
      this.formarray.at(this.formarray.controls.findIndex(x => x.value.productId === productId)) : null;
  }
  onEnableDisableControl(group: any, event: any) {
    switch (group.value.productId) {
      case WKAuditModuleType.FinancialPrep:
        if(event.target.checked){
          this.getformcontroltoDisable(WKAuditModuleType.AxcessEngagement)?.get('disabled')?.patchValue(true);
          this.getformcontroltoDisable(WKAuditModuleType.AxcessKC)?.get('disabled')?.patchValue(true);
          this.getformcontroltoDisable(WKAuditModuleType.KnowledgeCoachPCR)?.get('disabled')?.patchValue(true);
        } else {
          this.formarray.controls.forEach(x => x.get('disabled')?.patchValue(false));
        }
        break;
      case WKAuditModuleType.AxcessEngagement:
      case WKAuditModuleType.AxcessKC:
        if(event.target.checked){
          this.getformcontroltoDisable(WKAuditModuleType.FinancialPrep)?.get('disabled')?.patchValue(true)
        }else{
          this.disableFpBasedOnButton(this.getformcontroltoDisable(WKAuditModuleType.AxcessEngagement), this.getformcontroltoDisable(WKAuditModuleType.AxcessKC))
        }
    }
  }
  disableFpBasedOnButton(ae: AbstractControl | null, kc: AbstractControl | null){
    if((ae && ae.value.selected) || (kc && kc.value.selected)){
      this.getformcontroltoDisable(WKAuditModuleType.FinancialPrep)?.get('disabled')?.patchValue(true)
    }else {
      this.formarray.controls.forEach(x => x.get('disabled')?.patchValue(false));
    }
  }
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
    this.formarray.valueChanges.subscribe(fn );
  }
  registerOnTouched(fn: any): void {  }
  setDisabledState?(isDisabled: boolean): void {  }

}
