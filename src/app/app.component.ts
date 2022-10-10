import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppAbility } from './app-ability';

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

  data123 = [
    {id: 1, name: 'Gudu', gender: 'male', emp: '' },
    {id: 2, name: 'Papu', gender: 'male', emp: ''},
    {id: 3, name: 'Kuna', gender: 'male', emp: ['Gudu', 'Jaya']},
    {id: 4, name: 'Jaya', gender: 'female', emp: ''}
  ]
  
  constructor(private fb: FormBuilder, private app: AppAbility){
    this.app.add();
    const result = this.data123.map( x => {
      if(x.emp instanceof Array){
        let index = x.emp.findIndex(y => y == 'Gudu');
        console.log(index)
        x.emp.splice(index, 1);
      }
      return x;
    })
    console.log(result);
  }
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
