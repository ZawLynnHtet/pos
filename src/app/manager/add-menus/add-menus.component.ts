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
import { Category } from 'src/app/models/category.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ExtraFood } from 'src/app/models/extrafood.model';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/app/app.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, E, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-menus',
  templateUrl: './add-menus.component.html',
  styleUrls: ['./add-menus.component.css'],
})
export class AddMenusComponent implements OnInit {
  categories: any[] = [];
  ingredients: any[] = [];
  extras: any[] = [];
  matSelected!: number;
  meatChoices: any[] = ['Chicken', 'Pork', 'Beef', 'Fried Egg'];
  popupBox: any = {
    show: false,
    name: '',
  };
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  meatCtrl = new FormControl('');
  filteredMeats!: Observable<string[]>;
  meats: any[] = ['Pork', 'Beef', 'Chicken', 'Chicken', 'Fried Egg'];
  imgUrl: string = '..//..//../assets/images/loading-image.png';
  selectedFile: any = null;
  menuForm: FormGroup;

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<AddMenusComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: UtilsService,
    private utils: UtilsService
  ) {
    this.menuForm = fb.group({
      food_name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
      meat_choice: new FormArray([], [Validators.required]),
      ingredient_ids: new FormArray([], [Validators.required]),
      extraFood_ids: new FormArray([], [Validators.required]),
      img: new FormControl('', [Validators.required]),
      is_available: true,
    });
  }

  ngOnInit(): void {
    this.menuForm.patchValue(this.data);

    console.log(this.menuForm.value);

    if (this.menuForm.value.img) {
      this.imgUrl = this.menuForm.value.img;
    } else {
      this.imgUrl = '..//..//../assets/images/loading-image.png';
    }
    this.getItems();
  }

  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgUrl = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
      this.imgUrl = '..//..//../assets/images/profile.png';
    }
  }

  async uploadAndGetDownloadUrl(name: string): Promise<string> {
    const reference = ref(storage, `menus/${this.menuForm.value.foodName}`);

    await uploadBytes(reference, this.selectedFile?.file!);
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

  addMeat(event: any): void {
    const value = (event.target.value || '').trim();
    if (value) {
      let data = { name: value };
      this.meats.push(data);
    }
    event.target.value = '';
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

  async addExtra(event: any) {
    const value = (event.target.value || '').trim();
    if (value) {
      let data = { food_name: value };
      this.extras.push(data);
      await this.api.postExtraFood(data);
    }
    event.target.value = '';
  }

  async getItems() {
    let ctg = await this.api.getAllCategories();
    this.categories = ctg;
    let ing = await this.api.getAllIngredient();
    this.ingredients = ing;
    let ext = await this.api.getAllExtraFoods();
    this.extras = ext;
  }

  onCheckboxChange(evt: any, formCtlName: string) {
    const array: FormArray = this.menuForm.controls[
      `${formCtlName}`
    ] as FormArray;
    if (evt.target.checked) {
      array.push(new FormControl(evt.target.value));
      console.log('The value of this array' + array);
    } else {
      const index = array.controls.findIndex(
        (x) => x.value === evt.target.value
      );
      array.removeAt(index);
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
    const url = await this.uploadAndGetDownloadUrl(
      this.menuForm.value.food_name!
    );

    const menu: MenuItem = {
      category_id: this.menuForm.controls['category_id'].value,
      ingredient_ids: this.menuForm.controls['ingredient_ids'].value,
      extraFood_ids: this.menuForm.controls['extrasFood_ids'].value,
      meat_choice:
        this.menuForm.controls['meat_choices'].value.length < 1
          ? null
          : this.menuForm.controls['meat_choices'].value,
      food_name: this.menuForm.value.food_name!,
      price: parseInt(this.menuForm.value.price!),
      img: url,
      is_available: true,
    };
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
    }
  }
}
