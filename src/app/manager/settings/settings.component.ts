import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/app/app.module';
import { Restaurant } from 'src/app/models/info.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  selectedFile: any = null;
  imgUrl: string = '..//..//../assets/images/logo.png';
  infoForm: FormGroup;
  name = new FormControl('', [Validators.required]);
  url: string = '';
  restaurantInfo: Restaurant[] = [];

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private snackBar: UtilsService
  ) {
    this.infoForm = fb.group({
      restaurant_name: new FormControl('', [Validators.required]),
      logoImg: new FormControl(''),
    });
  }

  async ngOnInit() {
    this.getInfo();
  }

  async getInfo() {
    this.restaurantInfo = await this.api.getRestaurantInfo();
    console.log(this.restaurantInfo);
  }
  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgUrl = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
      this.imgUrl = '..//..//../assets/images/logo.png';
    }
  }

  async uploadAndGetDownloadUrl(name: string): Promise<string> {
    const reference = ref(
      storage,
      `restaurant/${this.infoForm.value.restaurant_name}`
    );
    await uploadBytes(reference, this.selectedFile);
    return await getDownloadURL(ref(storage, `restaurant/${name}`));
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  }

  async uploadInfo() {
    if (this.restaurantInfo[0].logoImg == null) {
      this.url = await this.uploadAndGetDownloadUrl(
        this.infoForm.value.restaurant_name!
      );
      console.log(this.url);
    } else {
      this.url = this.restaurantInfo[0].logoImg;
    }

    const data = {
      restaurant_name: this.infoForm.value.restaurant_name,
      logoImg: this.infoForm.value.logoImg,
    };
    if (this.infoForm.valid) {
      if (this.restaurantInfo) {
        await this.api.updateRestaurantInfo(this.restaurantInfo[0].id, data);
        this.getInfo();
      } else {
        await this.api.postRestaurantInfo(data);
        this.getInfo();
      }
    }
  }
}
