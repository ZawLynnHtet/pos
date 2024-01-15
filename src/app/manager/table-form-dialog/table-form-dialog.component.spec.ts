import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormDialogComponent } from './table-form-dialog.component';

describe('TableFormDialogComponent', () => {
  let component: TableFormDialogComponent;
  let fixture: ComponentFixture<TableFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
