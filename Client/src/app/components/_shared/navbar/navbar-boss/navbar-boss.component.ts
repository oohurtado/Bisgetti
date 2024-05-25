import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../services/common/local-storage.service';

@Component({
    selector: 'app-navbar-boss',
    templateUrl: './navbar-boss.component.html',
    styleUrl: './navbar-boss.component.css'
})
export class NavbarBossComponent {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    onLogoutClicked() {
        this.localStorageService.clean();
        this.router.navigateByUrl('/home');
    }
}
