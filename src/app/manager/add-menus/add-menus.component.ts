import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Menu, MenuItem } from 'src/app/models/menu.model';
import { UtilsService } from 'src/app/services/utils.service';
import { Category } from 'src/app/models/category.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ExtraFood } from 'src/app/models/extrafood.model';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/app/app.module';
import { Router } from '@angular/router';

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
  categories: Category[] = [];
  ingredients: Ingredient[] = [];
  extras: ExtraFood[] = [];
  meatChoices: any[] = ['Chicken', 'Pork', 'Beef', 'Fried Egg'];

  constructor(
    public api: ApiService,
    private builder: FormBuilder,
    private utils: UtilsService,
    private router: Router
  ) {}

  menuForm: FormGroup = this.builder.group({
    foodName: this.builder.control('', [Validators.required]),
    price: this.builder.control('', [Validators.required]),
    category: this.builder.control(0, [Validators.required]),
    meatChoices: this.builder.array([], [Validators.required]),
    // meatChoices: this.builder.array([new FormControl]) || this.builder.control(null),
    ingredients: this.builder.array([], [Validators.required]),
    extras: this.builder.array([], [Validators.required]),
  });

  async ngOnInit() {
    this.getLocalStorageItems();
  }

  async uploadAndGetDownloadUrl(name: string): Promise<string> {
    const reference = ref(storage, `menus/${this.menuForm.value.foodName}`);

    await uploadBytes(reference, this.selectedFile?.file!);
    return await getDownloadURL(ref(storage, `menus/${name}`));
  }

  getLocalStorageItems() {
    this.categories = this.utils.getSortedLocalStorageArray(
      'categories',
      'category_id'
    );
    this.ingredients = this.utils.getSortedLocalStorageArray(
      'ingredients',
      'ingredient_id'
    );
    this.extras = this.utils.getSortedLocalStorageArray(
      'extraFoods',
      'extraFood_id'
    );
    console.log(this.ingredients, this.extras);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile);
    });

    reader.readAsDataURL(file);
  }

  onCheckboxChange(evt: any, formCtlName: string) {
    const array: FormArray = this.menuForm.controls[
      `${formCtlName}`
    ] as FormArray;
    if (evt.target.checked) {
      array.push(new FormControl(evt.target.value));
    } else {
      const index = array.controls.findIndex(
        (x) => x.value === evt.target.value
      );
      array.removeAt(index);
    }
  }

  async addMenu() {
    const url = await this.uploadAndGetDownloadUrl(
      this.menuForm.value.foodName!
    );

    const menu: MenuItem = {
      category_id: this.menuForm.controls['category'].value,
      ingredient_ids: this.menuForm.controls['ingredients'].value,
      extraFood_ids: this.menuForm.controls['extras'].value,
      meat_choice:
        this.menuForm.controls['meatChoices'].value.length < 1
          ? null
          : this.menuForm.controls['meatChoices'].value,
      food_name: this.menuForm.value.foodName!,
      price: parseInt(this.menuForm.value.price!),
      img: url,
      is_available: true,
    };

    this.api.postMenu(menu).subscribe((res: any) => {
      console.log(res.data);
      this.router.navigateByUrl('/menus');
    });
  }
}
