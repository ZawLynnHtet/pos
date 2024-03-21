import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {
  FormArray,
  FormArrayName,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Menu, MenuItem } from 'src/app/models/menu.model';
import { UtilsService } from 'src/app/services/utils.service';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/app/app.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { COMMA, E, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-add-menus',
  templateUrl: './add-menus.component.html',
  styleUrls: ['./add-menus.component.css'],
})
export class AddMenusComponent implements OnInit {
  categories: any[] = [];
  ingredients: any[] = [];
  extras: any[] = [];
  meats: any = [];
  matSelected!: number;
  popupBox: any = {
    show: false,
    name: '',
  };
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  meatCtrl = new FormControl('');
  filteredMeats!: Observable<string[]>;
  imgUrl: string = '..//..//../assets/images/loading-image.png';
  selectedFile: any = null;
  menuForm: FormGroup;
  url: string = '';
  updateUrl: boolean = false;

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<AddMenusComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: UtilsService
  ) {
    this.menuForm = fb.group({
      food_name: new FormControl(''),
      price: new FormControl(''),
      category_id: new FormControl(''),
      meat_choice: new FormArray([]),
      ingredient_ids: new FormArray([]),
      extraFood_ids: new FormArray([]),
      img: new FormControl(''),
      is_available: true,
    });
  }

  ngOnInit(): void {
    this.getItems();
    this.getMeats();
    this.menuForm.patchValue(this.data);

    // this.menuForm.value.meat_choice.push(this.data.meat_choice);
    // this.menuForm.value.ingredient_ids.push(this.data.ingredient_ids);
    // this.menuForm.value.extraFood_ids.push(this.data.extraFood_ids);

    if (this.menuForm.value.img) {
      this.imgUrl = this.menuForm.value.img;
    } else {
      this.imgUrl = '..//..//../assets/images/loading-image.png';
    }
  }

  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgUrl = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
      this.updateUrl = true;
    } else {
      this.selectedFile = null;
      this.imgUrl = '..//..//../assets/images/profile.png';
    }
  }

  async uploadAndGetDownloadUrl(name: string): Promise<string> {
    const reference = ref(storage, `menus/${this.menuForm.value.food_name}`);

    await uploadBytes(reference, this.selectedFile);
    return await getDownloadURL(ref(storage, `menus/${name}`));
  }

  async addCategory(event: any) {
    const value = (event.target.value || '').trim();
    if (value) {
      let data = { category_name: value };
      this.categories.push(data);
      await this.api.postCategory(data);
    }
    event.target.value = '';
  }

  async delCategroy(index: number, id: number) {
    this.categories.splice(index, 1);
    await this.api.deleteCategory(id);
  }

  addMeat(event: any): void {
    const value = (event.target.value || '').trim();
    console.log(value);

    if (value) {
      console.log(this.meats);
      this.meats.push(value);
      console.log(this.meats);
      localStorage.setItem('meats', JSON.stringify(this.meats));
    }
    event.target.value = '';
  }

  delMeat(index: number) {
    this.meats.splice(index, 1);
    localStorage.setItem('meats', JSON.stringify(this.meats));
  }

  async addIngredient(event: any) {
    const value = (event.target.value || '').trim();
    if (value) {
      let data = { ingredient_name: value };
      this.ingredients.push(data);
      await this.api.postIngredient(data);
    }
    event.target.value = '';
  }

  async delIngredient(index: number, id: number) {
    this.ingredients.splice(index, 1);
    await this.api.deleteIngredient(id);
  }

  async addExtra(event: any) {
    const value = (event.target.value || '').trim();
    if (value) {
      let data = { food_name: value };
      this.extras.push(data);
      await this.api.postExtraFood(data);
    }
    event.target.value = '';
  }

  async delExtra(index: number, id: number) {
    this.extras.splice(index, 1);
    await this.api.deleteExtraFood(id);
  }

  getMeats() {
    let meats: any = localStorage.getItem('meats');

    this.meats = JSON.parse(meats);
    if (this.meats == null) {
      this.meats = [];
    }
  }

  async getItems() {
    let ctg = await this.api.getAllCategories();
    this.categories = ctg;
    console.log(this.categories);

    let ing = await this.api.getAllIngredient();
    this.ingredients = ing;
    console.log(this.ingredients);

    let ext = await this.api.getAllExtraFoods();
    this.extras = ext;
    console.log(this.extras);
  }

  onCheckboxChange(evt: any, type: any) {
    if (evt.target.checked) {
      if (type == 1) {
        this.menuForm.value.meat_choice.push(evt.target.value);
      } else if (type == 2) {
        this.menuForm.value.ingredient_ids.push(evt.target.value);
      } else if (type == 3) {
        this.menuForm.value.extraFood_ids.push(evt.target.value);
      }
    } else {
      if (type == 1) {
        const index = this.menuForm.value.meat_choice.indexOf(evt.target.value);
        this.menuForm.value.meat_choice.splice(index, 1);
      } else if (type == 2) {
        const index = this.menuForm.value.ingredient_ids.indexOf(
          evt.target.value
        );
        this.menuForm.value.ingredient_ids.splice(index, 1);
      } else if (type == 3) {
        const index = this.menuForm.value.extraFood_ids.indexOf(
          evt.target.value
        );
        this.menuForm.value.extraFood_ids.splice(index, 1);
      }
    }
  }

  addMenu() {
    console.log(this.menuForm.value);
    this.menuForm.reset();
    this.popupBox.show = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async submitted() {
    if (this.updateUrl == true) {
      this.url = await this.uploadAndGetDownloadUrl(
        this.menuForm.value.food_name!
      );
    } else {
      this.url = this.data.img;
    }

    const menu: MenuItem = {
      category_id: this.menuForm.controls['category_id'].value,
      ingredient_ids: this.menuForm.controls['ingredient_ids'].value,
      extraFood_ids: this.menuForm.controls['extraFood_ids'].value,
      meat_choice:
        this.menuForm.controls['meat_choice'].value.length < 1
          ? null
          : this.menuForm.controls['meat_choice'].value,
      food_name: this.menuForm.value.food_name,
      price: parseInt(this.menuForm.value.price),
      img: this.url,
      is_available: true,
    };
    console.log(this.menuForm.value);

    if (this.menuForm.valid) {
      if (this.data) {
        await this.api.updateMenu(this.data.menu_id, menu);
        this.snackBar.openSnackBar('Menu updated successful!');
        this.dialogRef.close(true);
      } else {
        await this.api.postMenu(menu);
        this.snackBar.openSnackBar('Menu create successful!');
        this.dialogRef.close(true);
      }
    } else {
      this.snackBar.openSnackBar('Please add requirement!');
    }
  }
}
