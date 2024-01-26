import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservDetailsComponent } from './reserv-details.component';

describe('ReservDetailsComponent', () => {
  let component: ReservDetailsComponent;
  let fixture: ComponentFixture<ReservDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
