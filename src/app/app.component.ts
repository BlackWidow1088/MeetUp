import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'meetup-gui';
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      console.log('Service Worker is available');
      this.swUpdate.available.subscribe(() => {

        if (confirm('New version available. Load New Version?')) {

          window.location.reload();
        }
      });
    }
  }
  constructor(private swUpdate: SwUpdate) {
  }

}
