import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { SharedService } from '../../../../services/common/shared.service';
import { general } from '../../../../source/common/general';
import { EnumRole } from '../../../../source/models/enums/role-enum';

@Component({
    selector: 'app-navbar-chef',
    templateUrl: './navbar-chef.component.html',
    styleUrl: './navbar-chef.component.css'
})
export class NavbarChefComponent {
    
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
