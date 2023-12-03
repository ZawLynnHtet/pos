import { Component, OnInit } from '@angular/core';
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

  constructor(public api: ApiService) {}

  ngOnInit(): void {
    let category: any = localStorage.getItem('categories');
    this.categories = JSON.parse(category);
    this.showMenus(this.categories[0].category_id);
  }

  async showMenus(id: number) {
    this.menus = await this.api.getMenus(id);
    this.categoryId = id;
  }
}
