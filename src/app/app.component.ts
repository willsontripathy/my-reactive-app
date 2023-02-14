import { CellPosition, ColDef, NavigateToNextCellParams } from '@ag-grid-community/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { AppAbility } from './app-ability';
import { CustomHeader } from './cust-header.componet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-reactive-app';
  @ViewChild('agGrid') agGrid!: AgGridAngular;
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
  columnDefs: ColDef[] = [
    { headerName: 'Make', field: 'make', checkboxSelection: true },
    { headerName: 'Model', field: 'model' },
    {
      headerName: 'Price', field: 'price', editable: false, checkboxSelection:false,
      headerComponent: CustomHeader
        
      
    }
  ];

	rowData = [
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Porsche', model: 'Boxster', price: 72000 }
	];
  
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
    this.data.forEach(x => {
      const group: FormGroup = this.fb.group({
        name: x.name,
        value: x.value,
        checked: x.checked,
        disabled:x.disabled
      });
      (this.employeeForm.get('datas') as FormArray).push(group);
    })
    
  }
  drop(){
    alert('okk');
  }
  ongo(){
    // this.agGrid.columnApi.co
    const firstCol = this.agGrid.columnApi.getAllDisplayedColumns()[2];
    this.agGrid.api.ensureColumnVisible(firstCol );
    this.agGrid.api.setFocusedCell(0, firstCol);  
  }
  onCellValueChanged(event: any){
    const firstCol = this.agGrid.columnApi.getAllDisplayedColumns()[2];
    this.agGrid.api.ensureColumnVisible(firstCol );
    this.agGrid.api.setFocusedCell(event.rowIndex+1, firstCol);  
  }

}
