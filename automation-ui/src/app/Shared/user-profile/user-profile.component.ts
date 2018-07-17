import { Component, OnInit } from '@angular/core';
import { SlideMenuModule } from 'primeng/slidemenu';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'nextdev-comp-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Settings',
                icon: 'fas fa-cog',
                routerLink: '/design'
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                routerLink: '/monitor'
            },
            {
                label: 'Sign Out',
                icon: 'fa fa-power-off',
                routerLink: '/monitor'
            }
        ];
    }
}
