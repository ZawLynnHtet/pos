import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitStaffComponent } from './wait-staff.component';

describe('WaitStaffComponent', () => {
  let component: WaitStaffComponent;
  let fixture: ComponentFixture<WaitStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
