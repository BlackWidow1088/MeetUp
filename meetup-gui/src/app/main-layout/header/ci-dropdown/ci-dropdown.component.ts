import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { Aspect, AspectService } from 'app/shared/services/index';

@Component({
  selector: 'app-ci-dropdown',
  templateUrl: './ci-dropdown.component.html',
  styleUrls: ['./ci-dropdown.component.scss']
})
export class CiDropdownComponent implements OnInit {
  @ViewChild(NgbDropdown)
  private ciDropdownMenu: NgbDropdown;

  @Input() selectedSystem;
  @Input() ciDropdownLabel;
  @Input() filteredSystemsList;
  @Input() systemInfoList;

  ciQuery: string = '';

  virtualAspectService: boolean = false;

  constructor(
    private userAspect: AspectService,
    private router: Router,
    private platformLocation: PlatformLocation,
  ) {
    if (this.ciDropdownMenu) {
      this.platformLocation.onPopState(() => this.ciDropdownMenu.close());
    }
  }

  ngOnInit() {
    this.filteredSystemsList = this.shapeCIListByCompanyName(this.systemInfoList);
  }

  // to toggle notification panel by category
  navigateTo(route: string, ciName: string) {
    if (this.selectedSystem) {
      this.virtualAspectService = this.userAspect.hasSystemAspect(this.selectedSystem.systemId, Aspect.system.permission.hasVirtualizationData);
    }

    route = route.toLowerCase();
    route = route.replace(' ', '-');

    if (route.includes('csa')) {
      this.router.navigate([route]);
    } else {
      this.router.navigate(['csa/' + route]);
    }

    this.ciDropdownLabel = ciName;
  }

  resetDropdownIfOpened(event) {
    if (!event) {
      this.ciQuery = '';

      this.filterSystemsList({
        target: {
          value: this.ciQuery
        }
      });
    }
  }

  filterSystemsList(event) {
    const ciQuery = event.target.value;

    this.filteredSystemsList = this.shapeCIListByCompanyName(this.systemInfoList.filter(system => {
      return system.systemName.toLowerCase().includes(ciQuery.toLowerCase());
    }));
  }

  private shapeCIListByCompanyName(ciList) {
    const ciWithNoCompanyName = ciList.filter(item => !item.systemCompany);
    let ciWithCompanyName = ciList.filter(item => item.systemCompany);
    const selectCiList = [];

    ciWithCompanyName.forEach(ci => {
      const ciWithSameCompanyName = ciWithCompanyName.filter(item => item.systemCompany.toLowerCase() === ci.systemCompany.toLowerCase());
      ciWithCompanyName = ciWithCompanyName.filter(item => item.systemCompany.toLowerCase() !== ci.systemCompany.toLowerCase());

      if (ciWithSameCompanyName.length) {
        selectCiList.push({
          label: ci.systemCompany,
          items: ciWithSameCompanyName.sort(this.sortBySystemName)
        });
      }
    });

    selectCiList.sort((companyA, companyB) => {
      return this.sortObjectsByProperty(companyA, companyB, 'label');
    });

    // Add CIs with no company name to the end of the list
    if (ciWithNoCompanyName.length) {
      selectCiList.push({
        label: 'COMPANY NAME - N/A',
        items: ciWithNoCompanyName.sort(this.sortBySystemName)
      });
    }

    return selectCiList;
  }

  private sortBySystemName = (systemA, systemB) => {
    return this.sortObjectsByProperty(systemA, systemB, 'systemName');
  }

  private sortObjectsByProperty(objA, objB, sortProperty) {
    const objAValue = objA[sortProperty].toUpperCase();
    const objBValue = objB[sortProperty].toUpperCase();

    if (objAValue < objBValue) {
      return -1;
    }

    if (objAValue > objBValue) {
      return 1;
    }

    return 0;
  }
}
