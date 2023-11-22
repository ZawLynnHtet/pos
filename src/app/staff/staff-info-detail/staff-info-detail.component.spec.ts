import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInfoDetailComponent } from './staff-info-detail.component';

describe('StaffInfoDetailComponent', () => {
  let component: StaffInfoDetailComponent;
  let fixture: ComponentFixture<StaffInfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffInfoDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
