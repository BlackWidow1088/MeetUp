import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private systemService: SystemService, private router: Router) { }

  ngOnInit() {
  }

  download() {
    window.open('/api/download');
  }

  open() {
    this.router.navigate(['/app/lessons']);
  }
}
