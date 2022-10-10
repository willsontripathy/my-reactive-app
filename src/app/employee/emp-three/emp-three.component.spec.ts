import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpThreeComponent } from './emp-three.component';

describe('EmpThreeComponent', () => {
  let component: EmpThreeComponent;
  let fixture: ComponentFixture<EmpThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
