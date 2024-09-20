import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { SharedService } from '../../../../services/common/shared.service';
import { EnumRole } from '../../../../source/models/enums/role.enum';
import { general } from '../../../../source/general';

@Component({
    selector: 'app-navbar-customer',
    templateUrl: './navbar-customer.component.html',
    styleUrl: './navbar-customer.component.css'
})
export class NavbarCustomerComponent {

    _numberOfProducts : number = 0;

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router,
        private sharedService: SharedService
    ) { 
        this.sharedService.productAddedToCart.subscribe(p => {
			this._numberOfProducts = p;
		});
    }

    onLogoutClicked() {
        this.sharedService.onLogout(EnumRole.UserCustomer);
        this.localStorageService.clean();
        this.router.navigateByUrl('/home');
    }

    getRestaurantName() {
        return general.RESTAURANT_NAME;
    } 
}
