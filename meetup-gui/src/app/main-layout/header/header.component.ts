import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { MenuItem } from 'primeng/components/common/api';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

interface SubMenu {
  title: string;
  route: string;
}

export interface NavOption {
  title: string;
  options?: NavOption[];
  icon?: string;
  route?: string;
}

const label = {
  history: 'History',
  modify: 'Modify',
  delete: 'Delete'
};

const allSubMenuOptions: SubMenu[] = [
  {
    title: 'Storage',
    route: CI_COMPONENT_URL.STORAGE_LANDING,
 },
  {
    title: 'Compute',
    route: CI_COMPONENT_URL.COMPUTE_LANDING,
  },
  {
    title: 'Network',
    route: CI_COMPONENT_URL.NETWOEK_LANDING,
   },
  {
    title: 'Virtualization',
    route: CI_COMPONENT_URL.VIRTUALIZATION_LANDING,
   },
  {
    title: 'System Diagram',
    route: `/csa/ci/system-diagram/`,
   }
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  res: any[];
  visibleRows: any[];
  filteredSystemsList: any[];
  originalSystemsList: any[];
  nodesList: {};
  routerEventSubscription = new Subscription();
  messageSubscription = new Subscription();
  systemType: string;

  // using "queryParams" for Aspect Key as we dont have another usable key in the menu-item option list.

  moreOptions: MenuItem[] = [
    {
      label: label.history,
      visible: true,
      queryParams: {
        key: Aspect.system.permission.canViewHistory
      },
      command: onclick => {
        this.router.navigate([`/csa/ci/history/${this.selectedSystem.systemId}/${this.selectedSystem.rdocId}`]);
      }
    },
    {
      label: label.modify,
      visible: true,
      styleClass: 'fp-menu-separator',
      command: onclick => {
        this.onModifyCI();
      }
    },
    {
      label: label.delete,
      visible: true,
      command: onclick => {
        this.onDeleteCI();
      }
    }
  ];

  ciDropdownLabel: string;
  dashboardRoute: string = '/csa/dashboard';
  systemId: string;
  aspect = Aspect;
  isNetAppEmployee: boolean = false;
  isPartner: boolean = false;
  supportPortalRoute: string = '/csa/support-portal';
  partnerPortalRoute: string = '/csa/partner-portal';

  addInfrastructure = {
    title: 'Add Infrastructure',
    icon: 'assets/icons/icon-add-infrastructure.svg',
    route: '/csa/ci/infrastructure/add',
    routerLinkTitle: 'add'
  };
  addPartnerPortal = {
    title: 'Partner Portal',
    icon: 'assets/icons/icon-partner-portal.svg',
    route: '/csa/partner-portal'
  };
  addWelcomeGuide = {
    title: 'Welcome Guide',
    icon: 'assets/icons/icon-welcome-guide.svg',
    route: '/csa/welcome-guide'
  };
  addRules = {
    title: 'Rules',
    icon: 'assets/icons/icon-rules.svg',
    route: '/csa/rules'
  };
  addReports = {
    title: 'Reports',
    icon: 'assets/icons/icon-all-reports.svg',
    route: '/csa/reports'
  };
  addDownloadAgent = {
    title: 'Download Agent',
    icon: 'assets/icons/icon-agent-download.svg'
  };
  mainNavOptions: NavOption[] = [
    {
      title: 'Dashboard',
      icon: 'icon-speedometer'
    }
  ];
  subMenuOptions: SubMenu[] = [];
  allOptions: NavOption[] = [];

  preferences = getuserPreferencesFromLocalStorage();
  displayShareCI: boolean = false;
  displayDropDown: boolean = false;
  message: any;
  privilege: any;

  showupArrow: boolean = false;
  isOldRdoc: boolean = false;

  snapshotStatus : string;
  showModifyDeleteRestrictionDialog: boolean = false;

  constructor(
    private router: Router
  ) {
  }
}
