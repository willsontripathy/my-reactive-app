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
      return false;
    }
    abc(){
        this.params.column.getColDef().editable = !this.params.column.getColDef().editable;
        this.isEditEnabled = this.params.column.getColDef().editable;
        this.params.column.getColDef().checkboxSelection = true;
        this.params.api.tabToNextCell();
    }
  }