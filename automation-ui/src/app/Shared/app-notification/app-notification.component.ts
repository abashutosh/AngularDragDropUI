import { Component, OnInit } from '@angular/core';
import { SlideMenuModule } from 'primeng/slidemenu';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'nextdev-comp-notification',
    templateUrl: './app-notification.component.html',
    styleUrls: ['./app-notification.component.css']
})
export class NotificationComponent implements OnInit {

    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Environment 1'
            },
            {
                label: 'Environment 2'
            },
            {
                label: 'Environment 3'
            }
        ];
    }
    toggle(event) {
      console.log(event);
    }
}
