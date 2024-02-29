import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/app/app.module';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  selectedFile: any = null;
  imgUrl: string = '..//..//../assets/images/profile.png';
  infoForm: FormGroup;
  name = new FormControl('', [Validators.required]);

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private snackBar: UtilsService
  ) {
    this.infoForm = fb.group({
      name: new FormControl(''),
      img: new FormControl(''),
    });
  }

  ngOnInit(): void {}
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
    const reference = ref(storage, `restaurant/${this.infoForm.value.name}`);
    await uploadBytes(reference, this.selectedFile);
    return await getDownloadURL(ref(storage, `restaurant/${name}`));
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  }
}
