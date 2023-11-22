import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraditionalComponent } from './traditional.component';

describe('TraditionalComponent', () => {
  let component: TraditionalComponent;
  let fixture: ComponentFixture<TraditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraditionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
