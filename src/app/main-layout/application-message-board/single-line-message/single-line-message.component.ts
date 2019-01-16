import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-line-message',
  templateUrl: './single-line-message.component.html',
  styleUrls: ['./single-line-message.component.scss']
})
export class SingleLineMessageComponent implements OnInit {
  @Input() message: any = { type: '', text: '', isDismiss: false };
  constructor() { }

  ngOnInit() {
  }
}
