import { Component } from '@angular/core';
import { LocalStorageService } from '../../../../services/common/local-storage.service';

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

    isUserClient() {
        return this.localStorageService.isUserClient()
    }

    isUserAnon() {
        return this.localStorageService.isUserAnon();
    }
}
