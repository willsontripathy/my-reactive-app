import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-emp-four',
  templateUrl: './emp-four.component.html',
  styleUrls: ['./emp-four.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EmpFourComponent,
      multi: true
    }
  ]
})
export class EmpFourComponent implements OnInit, ControlValueAccessor {
  employeeType: any[] = [
    {id:1, name:'Permanet Employee'},
    {id:2, name:'Part Time Employee'},
    {id:3, name:'Onsite Employee'},
    {id:4, name:'Sales Employee'}
  ]
  @Input()
  parentForm!: FormGroup;
  public onChange!: (value: any) => void

  constructor() { }
  
  ngOnInit(): void {
  }
  writeValue(obj: any): void {
   this.parentForm.get('empType')?.setValue(obj)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

}
