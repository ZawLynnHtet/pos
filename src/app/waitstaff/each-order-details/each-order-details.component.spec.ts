import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachOrderDetailsComponent } from './each-order-details.component';

describe('EachOrderDetailsComponent', () => {
  let component: EachOrderDetailsComponent;
  let fixture: ComponentFixture<EachOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachOrderDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EachOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
