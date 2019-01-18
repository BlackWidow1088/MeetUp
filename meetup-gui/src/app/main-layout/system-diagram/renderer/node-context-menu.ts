import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  DiagramCategory, SystemDiagramDataService,
} from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { SystemDiagramOptions } from 'src/app/main-layout/system-diagram/system-diagram.component';
import { NodeDeviceType } from 'src/app/main-layout/system-diagram/util/componentVisualAppearance';

@Injectable()
export class NodeContextMenu {

  routeURl: string = '';
  constructor(
    private router: Router,
    private systemDiagramDataService: SystemDiagramDataService
  ) { }
  menu(systemDiagramOptions: SystemDiagramOptions) {
    const isVirtualization = systemDiagramOptions.hasDiagramType !== DiagramCategory.systemDiagram;

    return [{
      title: (image): string => {
        return `<i class="fa fa-link"></i> Go to <span class="app-bold">${image.type}</span> dashboard`;
      },
      action: (image): void => {
        const routeUrl = this.router.url.split('/');
        this.router.navigate([`/main-layout/${image.typeKey}/${image.typeKey}landing/${routeUrl[routeUrl.length - 2]}/${routeUrl[routeUrl.length - 1]}`]);
      },
      disabled: isVirtualization
    },
    {
      divider: !isVirtualization
    },
    {
      title: (image): string => {
        return `<i class="fa fa-link"></i> Go to <span class="app-bold">${image.label}</span>`;
      },
      action: (image): void => {
        let routeUrl = this.router.url.split('?');
        routeUrl = routeUrl[0].split('/');
        const typeMap = this.systemDiagramDataService.getDeviceDetailsRoute();
        image.deviceType = NodeDeviceType[image.type];
        if (image.type === 'VM') {
          this.router.navigate([`/main-layout/virtualization/virtualMachines/virtualMachine/${routeUrl[routeUrl.length - 2]}/${routeUrl[routeUrl.length - 1]}`]);
          return;
        }
        this.router.navigate([this.deviceDetailRouteURL(image, typeMap)], { queryParams: { breadcrumb: image.label } })
      },
      disabled: false
    },
    {
      divider: !isVirtualization
    },
    {
      title: (): string => {
        return `<i class="fa fa-eye-slash"></i> Hide`;
      },
      action: (image): void => {
        this.systemDiagramDataService.updateComponent(image);
      },
      disabled: isVirtualization
    }];
  }

  deviceDetailRouteURL(image, typeMap): string {
    for (const deviceType of Object.keys(typeMap)) {
      if (deviceType === image.type || deviceType === image.deviceType) {
        for (const type of typeMap[deviceType]) {
          const resultURL = this.getURL(image, type);
          if (resultURL) {
            return resultURL;
          }
        }
      }
    }
  }

  private getURL(image, type): string {
    if (image.label.toLowerCase().includes(type.name.toLowerCase())
      || image.label.replace('-', ' ').toLowerCase() === type.name.replace('-', ' ').toLowerCase()
      || image.model_number === type.name) {
      this.routeURl = type.route;
    }
    if (type.children) {
      for (const child of type.children) {
        this.getURL(image, child);
      }
    }
    return this.routeURl;
  }
}
