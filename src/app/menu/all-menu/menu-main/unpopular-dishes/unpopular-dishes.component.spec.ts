import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpopularDishesComponent } from './unpopular-dishes.component';

describe('UnpopularDishesComponent', () => {
  let component: UnpopularDishesComponent;
  let fixture: ComponentFixture<UnpopularDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpopularDishesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpopularDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
