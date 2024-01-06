import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private api: ApiService, private router: Router) {}

  async ngOnInit() {
    let category: any = localStorage.getItem('categories');
    this.categories = JSON.parse(category);
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

  showModel() {
    this.show = true;
  }

  editMenu(id: number) {
    this.router.navigateByUrl('menus/add-menus');
  }

  async deleteMenu(id: number) {
    await this.api.deleteOneMenu(id);
  }
}
