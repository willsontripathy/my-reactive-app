import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-reactive-app';
  checkboxesData: any[] = [
    {name: "checkbox1", selected: false, disabled: false},
    {name: "checkbox2", selected: false, disabled: false},
    {name: "checkbox3", selected: false, disabled: false}
  ]
  employeeForm: FormGroup = this.fb.group({
    datas: this.fb.array([]),
    dataTwo: new FormControl([])
  });
  data: any[] = [
    { name: 'd1', checked: false, value: 12, disabled: false },
    { name: 'd2', checked: false, value: 13, disabled: false },
    { name: 'd3', checked: false, value: 14, disabled: false }
  ];
  
  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    this.employeeForm.get('dataTwo')?.setValue(this.checkboxesData);
    this.data.map(x => {
      const group: FormGroup = this.fb.group({
        name: x.name,
        value: x.value,
        checked: x.checked,
        disabled:x.disabled
      });
      (this.employeeForm.get('datas') as FormArray).push(group);
    })
  }
}
