import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { SharedService } from '../../../../services/common/shared.service';
import { EnumRole } from '../../../../source/models/enums/role-enum';
import { general } from '../../../../source/general';

@Component({
    selector: 'app-navbar-boss',
    templateUrl: './navbar-boss.component.html',
    styleUrl: './navbar-boss.component.css'
})
export class NavbarBossComponent {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router,
        private sharedService: SharedService
    ) { }

    onLogoutClicked() {
        this.sharedService.onLogout(EnumRole.UserBoss);
        this.localStorageService.clean();
        this.router.navigateByUrl('/home');
    }

    getRestaurantName() {
        return general.RESTAURANT_NAME;
    } 
}
