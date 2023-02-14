import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-emp-input',
  templateUrl: './emp-input.component.html',
  styleUrls: ['./emp-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EmpInputComponent,
      multi: true
    },
  ]
})
export class EmpInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  employeeControl!: FormControl;
  @Input() controlValue: string = '';
  // isdisabled: boolean = false;
  @Input() isdisabled: boolean =false;
  public onChange!: (value: any) => void;
  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) { }
  ngAfterViewInit(): void {
    // console.log(this._elementRef.nativeElement.parentElement.querySelector('.par-1'))
    // this._renderer.setStyle(this._elementRef.nativeElement.parentElement.querySelector('.mat-card-title'), 'background-color', 'red')
  }
  ngOnInit(): void {
    this.employeeControl = new FormControl({value: this.controlValue, disabled: this.isdisabled})
    // console.log(this.employeeControl.value);
    
  }
  writeValue(obj: any): void {
    if(obj){
      this.employeeControl.setValue(obj);
    }
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.employeeControl.valueChanges.subscribe(val => this.onChange(val));
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // if(isDisabled){
    //   this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', this.isdisabled);
    // }
  }

  

}
