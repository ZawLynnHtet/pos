import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-table-form-dialog',
  templateUrl: './table-form-dialog.component.html',
  styleUrls: ['./table-form-dialog.component.css'],
})
export class TableFormDialogComponent implements OnInit {
  tableForm: FormGroup;

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<TableFormDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: UtilsService
  ) {
    this.tableForm = fb.group({
      table_no: new FormControl(''),
      capacity: new FormControl(''),
      is_available: true,
    });
  }

  ngOnInit(): void {
    this.tableForm.patchValue(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async submitted() {
    if (this.tableForm.valid) {
      if (this.data) {
        await this.api.updateTable(this.data.table_id, this.tableForm.value);
        this.snackBar.openSnackBar('Table updated successful!');
        this.dialogRef.close(true);
      } else {
        await this.api.postTable(this.tableForm.value);
        this.snackBar.openSnackBar('Table create successful!');
        this.dialogRef.close(true);
      }
    }
  }
}
