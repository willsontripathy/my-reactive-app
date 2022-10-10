import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray } from '@angular/forms';

@Component({
  selector: 'app-emp-three',
  templateUrl: './emp-three.component.html',
  styleUrls: ['./emp-three.component.css']
})
export class EmpThreeComponent implements OnInit,ControlValueAccessor {
  formarray!: FormArray;
  public onChange!: (value: any) => void;
  constructor() { }
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
