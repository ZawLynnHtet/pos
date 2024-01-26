import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddMenusComponent } from '../add-menus/add-menus.component';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent implements OnInit {
  categories: any = [];
  categoryId?: number;
  menus: Menu[] = [];
  selected: boolean = false;
  show: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: UtilsService
  ) {}

  async ngOnInit() {
    this.categories = await this.api.getAllCategories();
    if (this.selected === false) {
      this.menus = await this.api.getAllMenus();
    }
  }

  async showMenus(id: number) {
    this.selected = true;
    this.menus = await this.api.getMenus(id);
    this.categoryId = id;
  }

  async allCategories() {
    this.selected = false;
    this.menus = await this.api.getAllMenus();
  }

  async deleteMenu(id: number) {
    await this.api.deleteOneMenu(id);
    this.snackBar.openSnackBar('Table deleted successful', 'done!');
    this.menus = await this.api.getAllMenus();
  }

  addMenuFormDialog() {
    const dialogRef = this.dialog.open(AddMenusComponent);

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.allCategories();
      }
    });
  }

  async editMenuFormDialog(data: any) {
    const dialogRef = this.dialog.open(AddMenusComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.allCategories();
      }
    });
  }
}
