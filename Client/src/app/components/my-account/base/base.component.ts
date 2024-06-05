import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/common/local-storage.service';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrl: './base.component.css'
})
export class BaseComponent {

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
