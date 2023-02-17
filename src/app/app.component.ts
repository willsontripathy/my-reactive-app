import { CellClassParams, CellPosition, ColDef, NavigateToNextCellParams } from '@ag-grid-community/core';
import { StartEditingCellParams } from '@ag-grid-community/core/dist/cjs/es5/gridApi';
import { registerLocaleData } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { BehaviorSubject } from 'rxjs';
import { AppAbility } from './app-ability';
import { CustomHeader } from './cust-header.componet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-reactive-app';
  public onGo!:any;
  
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
      headerName: 'Price', field: 'price',
      headerComponent: CustomHeader,
      cellStyle: this.cellStyle
      
    }
  ];
   cellStyle(params: CellClassParams) {
    const  x = (params.column.getColDef().editable) ? 'red' :'yellow'
    const color = 'red';
    return {
      backgroundColor: x,
    };
  }
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
    this.onGo = function (params: any){
      // this.agGrid.columnApi.co
      var previousCell = params.previousCellPosition;
        var suggestedNextCell = params.nextCellPosition
        ;
        const firstCol = params.columnApi.getAllDisplayedColumns()[2];
        switch (params.key) {
          case "ArrowDown":
            let nextRowIndex = suggestedNextCell.rowIndex;
            if (nextRowIndex < 0) {
             // return null;
            } else {
              params.api.startEditingCell({rowIndex:nextRowIndex,colKey:firstCol})
              
            }
            break;
          case 'ArrowUp':
             nextRowIndex = previousCell.rowIndex + 1;
            var renderedRowCount = this.agGrid.api.getModel().getRowCount();
            if (nextRowIndex >= renderedRowCount) {
             // return null;
            } else {
              // return {
              //   rowIndex: nextRowIndex,
              //   column: previousCell.column,
              //   floating: previousCell.floating
              // };
            }
            break;
          default:
            throw "this will never happen, navigation is always on of the 4 keys above";
        }
    }
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
    const r = RegExp(/(\d+)(\d{3})/);
    // const res = r.exec('99,999')
    let str: string = '-999999';
    while (r.test(str)) {
      str = str.replace(r, '$1' + ',' + '$2');
      
}
console.log(str)
  }
  drop(){
    alert('okk');
  }
  onRowEditingStarted(event: StartEditingCellParams){
    const firstCol = this.agGrid.columnApi.getAllDisplayedColumns()[2];
    this.agGrid.api.ensureColumnVisible(firstCol );
    this.agGrid.api.setFocusedCell(event.rowIndex+1, firstCol); 
  }
  onCellValueChanged(event: any){
    const firstCol = this.agGrid.columnApi.getAllDisplayedColumns()[2];
    //  this.agGrid.api.startEditingCell({rowIndex:event.rowIndex+1,colKey:firstCol})
    
  }

}
