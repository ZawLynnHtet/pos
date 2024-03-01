import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Employee } from 'src/app/models/employee.model';
import { UtilsService } from 'src/app/services/utils.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'id',
    'email',
    'phone',
    'role',
    'action',
  ];
  name: string[] = [];
  role: string[] = [];
  employees: Employee[] = [];
  dataSource!: MatTableDataSource<any>;
  selectedFile?: ImageSnippet;

  constructor(
    private builder: FormBuilder,
    private api: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: UtilsService
  ) {}

  ngOnInit() {
    this.getAllEmployeeData();
  }

  async getAllEmployeeData() {
    this.employees = await this.api.getAllEmployees();
    this.dataSource = new MatTableDataSource(this.employees);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.data = this.employees.filter((user) =>
      user.name.toLowerCase().startsWith(filterValue)
    );
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async deleteEmployee(id: number) {
    await this.api.deleteOneEmployee(id);
    this.snackBar.openSnackBar('Employee deleted successful', 'done!');
    this.getAllEmployeeData();
  }

  openRegisterFormDialog() {
    const dialogRef = this.dialog.open(EditEmployeeComponent);

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.getAllEmployeeData();
      }
    });
  }

  async openEditFormDialog(data: any) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.getAllEmployeeData();
      }
    });
  }
}
