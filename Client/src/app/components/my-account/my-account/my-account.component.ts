import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/common/local-storage.service';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrl: './my-account.component.css'
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
