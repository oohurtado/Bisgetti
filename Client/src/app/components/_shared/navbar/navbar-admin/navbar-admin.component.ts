import { Component } from '@angular/core';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../../services/common/shared.service';
import { EnumRole } from '../../../../source/models/enums/role.enum';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router,
        private sharedService: SharedService
    ) { }

    onLogoutClicked() {
        this.sharedService.onLogout(EnumRole.UserAdmin);
        this.localStorageService.clean();
        this.router.navigateByUrl('/home');
    }
}
