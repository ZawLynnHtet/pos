import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMenuComponent } from './add-new-menu.component';

describe('AddNewMenuComponent', () => {
  let component: AddNewMenuComponent;
  let fixture: ComponentFixture<AddNewMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
