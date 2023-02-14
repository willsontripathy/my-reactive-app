import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class EmployeeComponent {
  @Input() formarray!: FormArray;

  onChange(data: FormGroup, i: number, event:any) {
    if (event.target.checked) {
      if (data.value.value === 12) {
        (this.getformcontroltoDisable(13) as AbstractControl).get('disabled')?.patchValue(true);
        (this.getformcontroltoDisable(14) as AbstractControl).get('disabled')?.patchValue(true);
      } else if (data.value.value === 13 || data.value.value === 14) {
       (this.getformcontroltoDisable(12) as AbstractControl).get('disabled')?.patchValue(true);
      }
    }else {
      if(data.value.value === 12){
      this.formarray.controls.forEach(x => x.get('disabled')?.patchValue(false));
      }else {
        if(((this.formarray.at(this.formarray.controls.findIndex(x => x.value.value === 13)).value.checked || 
        this.formarray.at(this.formarray.controls.findIndex(x => x.value.value === 14)).value.checked))){
        (this.getformcontroltoDisable(12) as AbstractControl).get('disabled')?.patchValue(true);
        this.formarray.controls.forEach(x => x.get('disabled')?.patchValue(false));
        }
      }
    }
  }
  getformcontroltoDisable(id: number): AbstractControl | null{
    return (this.formarray.controls.findIndex(x => x.value.value === id) !== -1) ? 
             this.formarray.at(this.formarray.controls.findIndex(x => x.value.value === id)) : null;
  }
}
