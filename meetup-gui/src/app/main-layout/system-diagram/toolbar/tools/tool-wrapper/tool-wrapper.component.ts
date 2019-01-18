import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ToolTypeStr } from 'src/app/main-layout/system-diagram/toolbar/toolbar.types';

@Component({
  selector: 'app-tool-wrapper',
  templateUrl: './tool-wrapper.component.html',
  styleUrls: ['./tool-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolWrapperComponent implements OnInit {
  @Input() showSubMenu: any = {};
  toolTypeStr = ToolTypeStr;

  constructor() { }

  ngOnInit() {
  }
}
