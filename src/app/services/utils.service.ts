import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getSortedLocalStorageArray(key: string, sortBy: string): any[] {
    const items = localStorage.getItem(key);
    let sortedArray = [];
    if (items != null) {
      const json: any[] = JSON.parse(items);
      sortedArray = json.sort((a, b) => a[sortBy] - b[sortBy]);
    }
    return sortedArray;
  }
}
