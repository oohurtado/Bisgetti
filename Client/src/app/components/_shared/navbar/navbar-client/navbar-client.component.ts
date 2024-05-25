import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../services/common/local-storage.service';

@Component({
    selector: 'app-navbar-client',
    templateUrl: './navbar-client.component.html',
    styleUrl: './navbar-client.component.css'
})
export class NavbarClientComponent {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    onLogoutClicked() {
        this.localStorageService.clean();
        this.router.navigateByUrl('/home');
    }
}
