import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInputComponent } from './emp-input.component';

describe('EmpInputComponent', () => {
  let component: EmpInputComponent;
  let fixture: ComponentFixture<EmpInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
