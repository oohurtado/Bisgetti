import { Component } from '@angular/core';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    constructor(
        private localStorageService: LocalStorageService        
    ) { }

    isUserAdmin() {
        return this.localStorageService.isUserAdmin()
    }

    isUserBoss() {
        return this.localStorageService.isUserBoss()
    }

    isUserCustomer() {
        return this.localStorageService.isUserCustomer()
    }

    isUserAnon() {
        return this.localStorageService.isUserAnon();
    }
}
