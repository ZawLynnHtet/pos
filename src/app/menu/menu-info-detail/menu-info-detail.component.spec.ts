import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInfoDetailComponent } from './menu-info-detail.component';

describe('MenuInfoDetailComponent', () => {
  let component: MenuInfoDetailComponent;
  let fixture: ComponentFixture<MenuInfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuInfoDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
