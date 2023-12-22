import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfosComponent } from './order-infos.component';

describe('OrderInfosComponent', () => {
  let component: OrderInfosComponent;
  let fixture: ComponentFixture<OrderInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderInfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
