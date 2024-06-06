import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/common/local-storage.service';

@Component({
    selector: 'app-my-account-base',
    templateUrl: './my-account-base.component.html',
    styleUrl: './my-account-base.component.css'
})
export class MyAccountBaseComponent {

    constructor(private localStorageService: LocalStorageService) {
    }

    isUserAdmin() {
        return this.localStorageService.isUserAdmin();
    }

    isUserBoss() {
        return this.localStorageService.isUserBoss();
    }

    isUserCustomer() {
        return this.localStorageService.isUserCustomer();
    }

}
