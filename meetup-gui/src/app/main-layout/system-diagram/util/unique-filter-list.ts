import { Injectable } from '@angular/core';

@Injectable()
export class FilterList {
  constructor() { }

  getFilteredList(data, label: String) {
    if (data.length) {
      if (!data.find(labelPresent => labelPresent.label ? labelPresent.label.toLowerCase() === label.toLowerCase() : '')) {
        data.push({ label: label, checked: true });
      } else {
        // Reset condition
        for (const iterator of data) {
          iterator.checked = true;
        }
      }
    } else {
      data.push({ label: label, checked: true });
    }
    return data;
  }
}
