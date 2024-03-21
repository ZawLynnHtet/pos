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
  restaurantName: string = '';
  updateUrl: boolean = false;
  id!: number;

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
    this.restaurantInfo.forEach((value) => {
      if(value){
        this.restaurantName = value.restaurant_name;
        this.imgUrl = value.logoImg;
        // this.url = value.logoImg;
        this.id = value.id;
      }
    })
  }
  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgUrl = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
      this.updateUrl = true;
      console.log(this.updateUrl);
      
    } else {
      this.selectedFile = null;
      this.imgUrl = '..//..//../assets/images/logo.png';
    }
  }

  async uploadAndGetDownloadUrl(name: string): Promise<string> {
    const reference = ref(storage, `restaurant/${this.infoForm.value.restaurant_name}`);
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
    if (this.updateUrl == true) {
      
      this.url = await this.uploadAndGetDownloadUrl(
        this.infoForm.value.restaurant_name!
      );
    }else {
      this.url = this.restaurantInfo[0].logoImg;
    }
    
    

    const data = {
      restaurant_name: this.infoForm.value.restaurant_name,
      logoImg: this.url,
    };

    if (this.infoForm.valid) {
      if (this.restaurantInfo.length > 0) {
        await this.api.updateRestaurantInfo(this.id, data);
        this.getInfo();
        this.snackBar.openSnackBar('Info updated successful!');
      } else {
        await this.api.postRestaurantInfo(data);
        this.getInfo();
        this.snackBar.openSnackBar('Info created successful!');
      }
    }
  }
}
