import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'nextdev-comp-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {

    navbarid: string;
    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                switch (event.url) {
                    case '/environments':
                        this.navbarid = '2';
                        break;

                    case '/monitor':
                        this.navbarid = '3';
                        break;

                    case '/assess':
                        this.navbarid = '4';
                        break;

                    default:
                        this.navbarid = '1';
                        break;
                }
            }
        });
    }
}
