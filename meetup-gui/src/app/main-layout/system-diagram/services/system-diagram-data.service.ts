import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoaderService } from 'src/app/loader/loader.service';
import { FilterList } from 'src/app/main-layout/system-diagram/util/unique-filter-list';
import { MessageType } from 'src/app/main-layout/application-message-board/application-message-board-model';
import { ApplicationMessageBoardService } from 'src/app/main-layout/application-message-board/application-message-board.service';
import { ApiBaseService, UserPreferenceService } from 'src/app/core/service';

export enum DiagramCategory {
  systemDiagram, virtualDiagram
}

export enum wrapperNodes {
  service_profile = 'service_profile',
  groupNode = 'groupNode'
}

export interface Node {
  label?: string
  group?: string,
  type?: string,
}

export interface SystemDiagram {
  nodes?: any[],
  links?: any[],
  groups?: any[],
  error?: string,
}

@Injectable()
export class SystemDiagramDataService {

  componentList: any[] = [];
  private subject = new Subject<any>();
  private components = new BehaviorSubject<any>(``);
  private deviceDetailsRoute = {};
  private protocol = new Subject<any>();
  private legends = new Subject<any>();
  private data: any = {};
  private updatedFilterData = new FilterList();
  private appliedFilter: any = {
    'Devices': [],
    'Connections': []
  }
  private userPreferences: any = [];
  private currentCI: string;
  private reset: boolean;

  constructor(
    private router: Router,
    private apiBaseService: ApiBaseService,
    private messageBoardService: ApplicationMessageBoardService,
    private loaderService: LoaderService,
    private userPreferenceService: UserPreferenceService
  ) { }

  setData = (data: any): void => {
    this.data = data;
    this.subject.next(data);
  }

  setDeviceDetailsRoute(routeList) {
    this.deviceDetailsRoute = routeList;
  }

  getDeviceDetailsRoute() {
    return this.deviceDetailsRoute;
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  resetDiagram = (): void => {
    this.reset = true;
    this.subject.next(this.systemDiagramAPICall());
    this.resetFilter();
  }

  resetFilter = (): any => {
    if (this.data && this.data.nodes) {
      this.appliedFilter['Connections'] = [];
      this.filterProps(this.data.links, 'protocol').forEach(key => {
        this.appliedFilter['Connections'] = this.updatedFilterData.getFilteredList(this.appliedFilter['Connections'], key);
      });
      this.filterProps(this.data.nodes, 'type').forEach(key => {
        this.appliedFilter['Devices'] = this.updatedFilterData.getFilteredList(this.appliedFilter['Devices'], key);
      });
      if (this.reset) {
        this.updateComponentsNode(`all`);
      }
      this.filterDiagramComponents();
      return this.appliedFilter;
    }
  }
  getAppliedFilter = (): any => {
    return this.appliedFilter;
  }

  filterDiagramComponents = (): void => {
    this.toggleComponentVisibility(this.data.nodes, 'type', this.appliedFilter['Devices']);
    this.toggleComponentVisibility(this.data.links, 'protocol', this.appliedFilter['Connections']);
    this.hideComponents();
    this.setData(this.data);
  }

  /**
   * componentList : this.data.nodes / this.data.links
   * propertyKe : 'type' / 'protocol'
   */
  filterProps(componentList, propertyKey) {
    const uniqueProps = new Set<String>();
    for (const ele of componentList) {
      uniqueProps.add(ele[propertyKey]);
    }
    return uniqueProps;
  }
  /**
   * @param: componentList : this.data.nodes / this.data.links
   * @param: propertyType = 'type / protocol'
   * @param: filtersArray : Devices / Connections
   */

  toggleComponentVisibility(componentList, propertyType, filtersArray) {
    const filters = new Map<String, boolean>();
    for (const ele of filtersArray) {
      filters.set(ele.label, ele.checked);
    }
    for (const component of componentList) {
      if (!filters.get(component[propertyType])) {
        component[`visibility`] = `hidden`;
      } else {
        component[`visibility`] = `visible`;
      }
    }
  }

  updateComponent = (image: any): void => {
    const componentIndex = this.componentList.findIndex(element => element.id === image.id);
    if (componentIndex === -1) {
      this.componentList.push(image);
      this.updateComponentsNode(`remove`, image);
    } else if (componentIndex !== -1) {
      this.componentList.splice(componentIndex, 1);
      this.updateComponentsNode(`add`, image);
    }
  }

  updateComponentsNode = (action, image?: any): void => {
    if (this.data) {
      this.data.nodes.map((node) => {
        if (action === `remove` && node.id === image.id) {
          node[`visibility`] = `hidden`;
        } else if (action === `all` || (action === `add` && node.id === image.id)) {
          node[`visibility`] = `visible`;
        }
      });
      if (action === `all`) {
        this.componentList = [];
      }
      this.components.next(this.componentList);
      this.setData(this.data);
    }
  }

  private hideComponents = (): void => {
    this.data.nodes.forEach(node => {
      this.componentList.forEach(element => {
        if (node.id === element.id) {
          node[`visibility`] = `hidden`;
        }
      });
    });
  }

  subscribeComponents(): Observable<any> {
    return this.components.asObservable();
  }

  private updateAppliedFilter(userCopy) {
    if (Array.isArray(userCopy)) {
      this.userPreferences = JSON.parse(this.userPreferenceService.preferences);
      if (this.userPreferences && this.userPreferences.systemDiagram && this.userPreferences.systemDiagram[this.getCurrentID()]['filterList']) {
        this.resetFilter();
        this.userPreferences.systemDiagram[this.getCurrentID()]['filterList'] = this.appliedFilter;
        return this.appliedFilter;
      }
    } else {
      return userCopy;
    }
  }

  saveDiagram = (zoomValue): Observable<any> => {
    const nodes = this.updateNodes();

    if (nodes.length) {
      this.userPreferences = JSON.parse(this.userPreferenceService.preferences);
      if (this.userPreferences && !this.userPreferences.systemDiagram) {
        this.userPreferences.systemDiagram = {};
      }

      this.userPreferences.systemDiagram[this.getCurrentID()] = {
        nodes: nodes,
        zoom: zoomValue,
        height: window.innerHeight,
        width: window.innerWidth,
        filterList: this.appliedFilter,
        recycleList: this.componentList
      };

      return this.userPreferenceService.saveUserPreference(this.userPreferences).pipe(
        map(res => {
          this.messageBoardService.clear();
          this.messageBoardService.enqueueMessage('System diagram saved successfully', { isDismiss: true, keepAfterNavigationChange: false });
          return res;
        },
          error => {
            //  log Error
            return error;
          }
        ));
    } else {
      return of([]);
    }
  }

  updateNodes = (): any[] => {
    const updatedNodes = [];
    this.data.nodes.map((element) => {
      updatedNodes.push({
        id: element.id,
        x: element.x,
        y: element.y,
        visibility: element.visibility
      });
    });
    this.reset = false;
    return updatedNodes;
  }

  private preProcessData(data) {
    this.data = data;
    if (this.data.groups) {
      // Removed empty object if present
      this.data.groups = this.data.groups.filter(group => Object.keys(group).length !== 0);
      this.addOrModifyAttributes(this.data.groups);
    }
    this.addOrModifyAttributes();
  }

  private addOrModifyAttributes(nodes = this.data.nodes) {
    for (const node of nodes) {
      node.typeKey = node.type.toLowerCase();
      node.subTypeKey = node['sub-type'].toLowerCase();
      if (!node.model_number) {
        // we need to toggle vm icon based on their count
        const singleVm = `vm`, multiVm = `VMs`;
        node.model_number = node.subTypeKey;
        if (node.typeKey === singleVm && (node.count > 1)) {
          node.model_number = multiVm;
        }
      }
      if (node.children) {
        this.addOrModifyAttributes(node.children);
      }
    }
  }

  private handleSystemDiagramData(data) {
    if (!data.error) {
      this.preProcessData(data);
    }
    this.setData(this.data);
  }

  /**
   * @param data : diagram_data fetched from rdoc
   */
  initialize(data: SystemDiagram) {
    this.handleSystemDiagramData(data);
    this.loaderService.hide();
  }

  systemDiagramAPICall = (): any => {
    this.data = [];
    this.componentList = [];
    this.components.next(this.componentList);
    this.loaderService.show();

    //TODO: parsing url
    const parsedUrl = {systemId: '123', rdocId: '456'};
    if (parsedUrl && parsedUrl.systemId && parsedUrl.rdocId) {
        try {
          this.messageBoardService.clear();
          this.apiBaseService.get(`api/system/${parsedUrl.systemId}/diagram`).subscribe(res => {
            console.log('systems', res);
            if (res.nodes) {
              this.preProcessData(res);
              // Filtering 'Blade server' and 'FEX' as for Huron-2.0, we will be showing chassis with static image.
              this.data.nodes = this.data.nodes.filter(node => node['sub-type'] !== 'Blade server' && node['sub-type'] !== 'FEX');
              if (!this.reset) {
                // Check for user preference
                this.userPreferences = this.userPreferenceService.getUserPreference().subscribe(userPref => {
                  const userPreferences = JSON.parse(userPref);
                  const userCopy = userPreferences.systemDiagram && userPreferences.systemDiagram[this.getCurrentID()];

                  if (userCopy && userCopy.nodes) {
                    this.data.zoom = userCopy.zoom;
                    this.data.dimension = {
                      height: userCopy.height,
                      width: userCopy.width
                    };
                    userCopy.nodes.map((element) => {
                      this.data.nodes.map(node => {
                        if (element.id === node.id) {
                          node.x = element.x;
                          node.y = element.y;
                          node.visibility = element.visibility;
                        }
                      });
                    });
                    if (userCopy.filterList && userCopy.recycleList) {
                      this.appliedFilter = this.updateAppliedFilter(userCopy.filterList);
                      this.componentList = userCopy.recycleList;
                      this.components.next(userCopy.recycleList);
                      this.filterDiagramComponents();
                    } else {
                      this.resetFilter();
                    }
                  } else {
                    this.resetFilter();
                  }
                  this.loaderService.hide();
                  return this.data;
                });
              } else {
                this.data.reset = this.reset;
                this.resetFilter();
                this.loaderService.hide();
                return this.data;
              }
            } else {
              this.messageBoardService.enqueueMessage('There are no devices available for this CI.', { type: MessageType.error, isDismiss: true, keepAfterNavigationChange: false });
            }
          }, error => {
            this.handelError(error);
            this.data.error = error;
            this.setData(this.data);
          });
        } catch (error) {
          this.handelError(error);
        }
    }
  }

  private handelError(error) {
    this.loaderService.hide();
    // TODO: log error
  }

  private getCurrentID = (): string => {
    const routeUrl = this.router.url.split('/');
    return routeUrl[routeUrl.length - 1];
  }

  setProtocol = (protocol: any): void => {
    this.protocol.next(protocol);
  }

  getProtocol(): Observable<any> {
    return this.protocol.asObservable();
  }

  setLegends = (legends: any): void => {
    this.legends.next(legends);
  }

  getLegends(): Observable<any> {
    return this.legends.asObservable();
  }
}
