import { Component } from '@angular/core';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar-anon',
    templateUrl: './navbar-anon.component.html',
    styleUrl: './navbar-anon.component.css'
})
export class NavbarAnonComponent {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    onLogoutClicked() {
        this.localStorageService.clean();
        this.router.navigateByUrl('/home');
    }
}
