import { Component, Input, OnInit } from '@angular/core';

import { SystemDiagramDataService } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { protocolBasedLinkColor } from 'src/app/main-layout/system-diagram/renderer/renderer.component';

@Component({
  selector: 'app-legends',
  templateUrl: './legends.component.html',
  styleUrls: ['./legends.component.scss']
})
export class LegendsComponent implements OnInit {

  @Input() showLegend;
  legendOptions: any = [];
  objectKeys = Object.keys;
  constructor(
    private systemDiagramDataService: SystemDiagramDataService
  ) { }

  ngOnInit() {
    this.legendOptions = [];
    this.systemDiagramDataService.getProtocol()
      .subscribe(response => {
        if (response) {
          response.forEach(element => {
            return this.legendOptions[element] = protocolBasedLinkColor[element];
          });
        }
      });
  }
}
