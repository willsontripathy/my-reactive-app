import { ColDef } from '@ag-grid-community/core';
import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
    selector: 'custom-header',
    template: `
      <div class="custom-header">
        <span>{{ params.displayName }}</span>
        <button (click)="abc()" *ngIf="isEditEnabled">+</button>
        <button (click)="abc()" *ngIf="!isEditEnabled">-</button>
      </div>
    `,
  })
  export class CustomHeader implements IHeaderAngularComp {
    public params!: IHeaderParams;
    isEditEnabled!: any;
    agInit(params: IHeaderParams): void {
      this.params = params;
      this.isEditEnabled = this.params.column.getColDef().editable;
    }
  
    refresh(params: IHeaderParams) {
      return true;
    }
    abc(){
        this.params.column.getColDef().editable = !this.params.column.getColDef().editable;
        this.isEditEnabled = this.params.column.getColDef().editable;
        // alert( this.params.columnApi.getColumns()?.length);
        // this.params.columnApi.getColumns()?.forEach(x => {
        //   x.getColDef().cellStyle = p => {
        //     return {color: 'red'}
        //   }
          
        // })
        this.params.api.refreshCells();
        // this.params.columnApi.getColumns()?.map((x: ColDef<any>) => {
        //   return x.cellStyle = pa => {
        //     return {color: 'red'}
        //   }
        // })
          // this.params.api.getColumnDef(this.params.column.getId())!.cellStyle = param => {
          //   return {color: 'red'}
          // }
        // }
        
        // this.params.column.setColDef()
        // this.params.columnApi.getAllDisplayedColumns().forEach(X => {
        //   X.getColDef().cellStyle = param => ({backgroundColor: 'red'})
        // })
    }
  }