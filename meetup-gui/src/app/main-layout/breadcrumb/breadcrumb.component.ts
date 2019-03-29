
import { mergeMap, map, filter } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router } from '@angular/router';
// TODO: is ViewEncapsulation part of @angular/animation  module see checklist?
import { Component, Input, OnChanges, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnDestroy {

  private routerSubscription: any;
  breadcrumbs: IBreadcrumb[];
  queryParams: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnDestroy(): void {
  }

  // navigate bread crumb url
  navigateBreadcrumb(breadcrumb) {
    let route = breadcrumb.url.substr(breadcrumb.url.lastIndexOf('/') + 1, breadcrumb.url.length);
    switch (route) {
      default:
        break;
    }
    if (route) {
      const extras: any = {};
      extras.queryParams = {
        breadcrumb: breadcrumb.label
      }
      this.router.navigate([route], extras);
    }
  }
}
