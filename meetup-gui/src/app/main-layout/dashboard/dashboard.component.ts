import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private systemService: SystemService) { }

  ngOnInit() {
  }

  download() {
    window.open('/api/download');
  }
}
