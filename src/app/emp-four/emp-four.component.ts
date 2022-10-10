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
    { id: 1, name: 'Permanet Employee' },
    { id: 2, name: 'Part Time Employee' },
    { id: 3, name: 'Onsite Employee' },
    { id: 4, name: 'Sales Employee' }
  ]
  // public readonly empType = new FormControl(null);
  public empType: FormControl = new FormControl(null);
  public onChange!: (value: any) => void

  constructor() { }

  ngOnInit(): void {
    this.empType.valueChanges.subscribe(val => this.onChange(val))
  }
  writeValue(value: any): void {
    if (value) {
      this.empType.setValue(value);
    }
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
