import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Menu, MenuItem } from 'src/app/models/menu.model';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-add-menus',
  templateUrl: './add-menus.component.html',
  styleUrls: ['./add-menus.component.css'],
})
export class AddMenusComponent implements OnInit {
  selectedFile?: ImageSnippet;

  constructor(public api: ApiService, private builder: FormBuilder) {}

  menuForm = this.builder.group({
    foodName: this.builder.control('', [Validators.required]),
    price: this.builder.control('', [Validators.required]),
  });

  ngOnInit(): void {}

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile);
    });

    reader.readAsDataURL(file);
  }

  addMenu() {
    const menu: MenuItem = {
      category_id: 4,
      ingredient_ids: [],
      extraFood_ids: [],
      meat_choice: [],
      food_name: this.menuForm.value.foodName!,
      price: parseInt(this.menuForm.value.price!),
      img: this.selectedFile?.file.name!,
      is_available: true,
    };
    this.api.postMenu(menu).subscribe((res: any) => {
      console.log(res.data);
    });
  }
}
