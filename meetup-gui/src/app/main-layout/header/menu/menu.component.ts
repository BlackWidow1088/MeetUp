import { Component, Input } from '@angular/core';

import { ActiveRouterLinkService } from 'app/core/services/active-router-link.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() allOptions;

  downloadAgentLinkUrl = environment.agentSupportLinkUrl;

  constructor(
    private activeRouterLinkService: ActiveRouterLinkService
  ) {}

  trackByFn(index) {
    return index;
  }

  isRouterLinkActive = (title): boolean => {
    return this.activeRouterLinkService.isRouterLinkActive(title);
  };
}
