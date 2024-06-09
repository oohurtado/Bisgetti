import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../source/list-base';
import { AddressResponse } from '../../../../source/models/business/address-response';
import { INavigationOptionSelected } from '../../../../source/models/interfaces/page.interface';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { UserMyAccountService } from '../../../../services/business/user/user-my-account.service';
import { Utils } from '../../../../source/utils';

@Component({
    selector: 'app-my-account-addresses-list',
    templateUrl: './my-account-addresses-list.component.html',
    styleUrl: './my-account-addresses-list.component.css'
})
export class MyAccountAddressesListComponent extends ListBase<AddressResponse> implements OnInit {

    constructor(
        private router: Router,
		localStorageService: LocalStorageService,
        private userMyAccountService: UserMyAccountService
    ) {
        super(null, localStorageService)
    }
    
    async ngOnInit() {
		await this.getDataAsync();
	}

    override async getDataAsync() {
		this._error = null;
		this._isProcessing = true;		
		await this.userMyAccountService
			.getAddressesByPageAsync()
			.then(p => {				
				this._pageData = p;
				this.updatePage(p);
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);	
			});
		this._isProcessing = false;
    }
}
