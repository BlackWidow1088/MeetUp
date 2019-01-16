import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { SystemDiagramDataService } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';

@Component({
  selector: 'app-filter-diagram',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {

  @Input() showFilter: boolean;

  appliedFilter: any = {};
  isSelectAll: boolean = true;

  constructor(private systemDiagramDataService: SystemDiagramDataService) { }

  ngOnInit() {
    this.appliedFilter = this.systemDiagramDataService.getAppliedFilter();
    this.setIsSelectAll();
  }

  hasSelectAll = (): void => {
    this.isSelectAll = ((this.appliedFilter['Devices'].length + this.appliedFilter['Connections'].length)  <=
                        this.appliedFilter['Devices'].filter(key => key.checked).length +
                        this.appliedFilter['Connections'].filter(key => key.checked).length);
  }

  setIsSelectAll() {
    Object.keys(this.appliedFilter).filter(key => {
      this.appliedFilter[key].forEach(checkedVal => {
        this.isSelectAll = this.appliedFilter[key].length !== this.appliedFilter[key].filter(element => !element.checked).length;
      });
    });
    this.hasSelectAll();
  }

  applyFilter = (): void => {
    this.systemDiagramDataService.filterDiagramComponents();
    this.setIsSelectAll();
  }

  toggleAll = (): void => {
    Object.keys(this.appliedFilter).filter(key => {
      this.appliedFilter[key].forEach(filter => {
        filter.checked = this.isSelectAll;
      });
    });
    this.applyFilter();
  }
}
