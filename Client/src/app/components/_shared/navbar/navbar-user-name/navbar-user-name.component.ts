import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { UserMyAccountService } from '../../../../services/business/user-my-account.service';
import { UserResponse } from '../../../../source/models/dtos/entities/user-response';
import { general } from '../../../../source/general';

@Component({
    selector: 'app-navbar-user-name',
    templateUrl: './navbar-user-name.component.html',
    styleUrl: './navbar-user-name.component.css'
})
export class NavbarUserNameComponent implements OnInit {
    
    _user: UserResponse|null = null;

    constructor(
        private localStorageService: LocalStorageService,
        private userMyAccountService: UserMyAccountService
    ) {  }

    async ngOnInit() {
        await this.userMyAccountService
            .getPersonalDataAsync()
            .then(p => {
                this._user = p;
                this.localStorageService.setValue(general.LS_FIRST_NAME, this._user.firstName);
                this.localStorageService.setValue(general.LS_LAST_NAME, this._user.lastName);
                this.localStorageService.setValue(general.LS_EMAIL_ADDRESS, this._user.email);
            })
            .catch(e => {
            });
    }

    getUser() {
        return this.localStorageService.getUserFirstName();
    }
}
