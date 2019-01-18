import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-collapsable-message',
  templateUrl: './collapsable-message.component.html',
  styleUrls: ['./collapsable-message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollapsableMessageComponent implements OnInit {
  @Input() message: any = { type: '', text: '', isDismiss: false };
  constructor() {
  }

  ngOnInit() {
  }
}
