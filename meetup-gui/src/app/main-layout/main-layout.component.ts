import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onScroll() {
    const list = document.querySelectorAll('.ui-multiselect-panel');

    Array.prototype.forEach.call(list, function (item) {
      item.style.display = 'none';
    });
  }

  onActivate(scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

}
