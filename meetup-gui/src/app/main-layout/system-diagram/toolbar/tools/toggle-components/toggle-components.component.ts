import { Component, OnInit } from '@angular/core';

import { SystemDiagramDataService } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';

@Component({
  selector: 'app-toggle-components',
  templateUrl: './toggle-components.component.html',
  styleUrls: ['./toggle-components.component.scss']
})
export class ToggleComponentsComponent implements OnInit {

  filterComponents: any = [];

  constructor(
    private systemDiagramDataService: SystemDiagramDataService
  ) {
    this.filterComponents = [];
    this.systemDiagramDataService.subscribeComponents().subscribe(response => {
      this.filterComponents = response;
    });
  }

  ngOnInit() { }

  addComponent = (component, event): void => {
    event.stopPropagation();
    this.systemDiagramDataService.updateComponent(component);
  }

  addAllComponent = (event): void => {
    event.stopPropagation();
    this.systemDiagramDataService.updateComponentsNode(`all`);
  }

}
