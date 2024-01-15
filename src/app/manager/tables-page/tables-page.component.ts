import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'src/app/models/table.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { TableFormDialogComponent } from '../table-form-dialog/table-form-dialog.component';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.css'],
})
export class TablesPageComponent {
  tables: Table[] = [];

  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: UtilsService
  ) {}

  ngOnInit() {
    this.getTables();
  }

  async getTables() {
    this.tables = await this.api.getAllTables();
  }

  async deleteTable(id: number) {
    await this.api.deleteTable(id);
    this.snackBar.openSnackBar('Table deleted successful', 'done!');
  }

  addTableFormDialog() {
    const dialogRef = this.dialog.open(TableFormDialogComponent);

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.getTables();
      }
    });
  }

  async editTableFormDialog(data: any) {
    const dialogRef = this.dialog.open(TableFormDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.getTables();
      }
    });
  }
}
