import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ActiveRouterLinkService } from 'app/core/services/active-router-link.service';
import { AspectService } from 'app/shared/services';

@Component({
  selector: 'app-ci-menu',
  templateUrl: './ci-menu.component.html',
  styleUrls: ['./ci-menu.component.scss']
})
export class CIMenuComponent implements OnChanges {
  @Input() subMenuOptions;
  @Input() selectedSystem;
  @Input() nodesList;
  @Input() moreOptions;
  @Input() displayDropDown;

  dropDownIndex: number = -1;

  constructor(
    private router: Router,
    private activeRouterLinkService: ActiveRouterLinkService,
    private userAspect: AspectService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.moreOptions && this.moreOptions.length) {
      for (const menu of this.moreOptions) {
        if (menu.queryParams && changes.selectedSystem && changes.selectedSystem.currentValue) {
          menu.visible = this.userAspect.hasSystemAspect(changes.selectedSystem.currentValue.systemId, menu.queryParams.key) &&
                            !!changes.selectedSystem.currentValue.rdocId;
        }
      }

      if (!this.moreOptions[0].visible) {
        this.moreOptions[1].styleClass = '';
      } else {
        this.moreOptions[1].styleClass = 'fp-menu-separator';
      }
    }
  }

  trackByFn(index) {
    return index;
  }

  createLink(route, selectedSystem) {
    this.displayDropDown = false;
    this.router.navigate([`${route}${selectedSystem.systemId}/${selectedSystem.rdocId}`]);
  }

  isRouterLinkActive = (title): boolean => {
    return this.activeRouterLinkService.isRouterLinkActive(title);
  };

  showDropDown(index) {
    if (index === this.dropDownIndex) {
      this.displayDropDown = !this.displayDropDown;
    } else {
      this.displayDropDown = true;
      this.dropDownIndex = index;
    }
  }
}
