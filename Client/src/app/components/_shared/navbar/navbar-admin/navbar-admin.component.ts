import { Component } from '@angular/core';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    onLogoutClicked() {
        this.localStorageService.clean();
        this.router.navigateByUrl('/home');
    }
}
