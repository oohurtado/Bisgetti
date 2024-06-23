import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/common/local-storage.service';

@Component({
    selector: 'app-my-account-list',
    templateUrl: './my-account-list.component.html',
    styleUrl: './my-account-list.component.css'
})
export class MyAccountListComponent {

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
