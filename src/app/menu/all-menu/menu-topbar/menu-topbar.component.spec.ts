import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTopbarComponent } from './menu-topbar.component';

describe('MenuTopbarComponent', () => {
  let component: MenuTopbarComponent;
  let fixture: ComponentFixture<MenuTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
