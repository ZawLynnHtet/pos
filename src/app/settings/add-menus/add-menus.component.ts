import { Component } from '@angular/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-add-menus',
  templateUrl: './add-menus.component.html',
  styleUrls: ['./add-menus.component.css'],
})
export class AddMenusComponent {
  selectedFile?: ImageSnippet;

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile);
    });

    reader.readAsDataURL(file);
  }
}
