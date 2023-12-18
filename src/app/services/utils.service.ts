import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private _snackBar: MatSnackBar) {}

  getSortedLocalStorageArray(key: string, sortBy: string): any[] {
    const items = localStorage.getItem(key);
    let sortedArray = [];
    if (items != null) {
      const json: any[] = JSON.parse(items);
      sortedArray = json.sort((a, b) => a[sortBy] - b[sortBy]);
    }
    return sortedArray;
  }

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }
}
