import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpFourComponent } from './emp-four.component';

describe('EmpFourComponent', () => {
  let component: EmpFourComponent;
  let fixture: ComponentFixture<EmpFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
