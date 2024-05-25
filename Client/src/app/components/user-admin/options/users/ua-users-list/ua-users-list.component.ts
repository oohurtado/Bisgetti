import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../../../../source/models/dtos/user/user-response';
import { PageData } from '../../../../../source/models/common/page-data';
import { ListBase } from '../../../../../source/list-base';
import { UserAdminService } from '../../../../../services/business/user/user-admin.service';

@Component({
    selector: 'app-ua-users-list',
    templateUrl: './ua-users-list.component.html',
    styleUrl: './ua-users-list.component.css'
})
export class UaUsersListComponent extends ListBase<UserResponse> implements OnInit {
    
    constructor(
        private userAdminService: UserAdminService
    ) {
        super();
    }  

    async ngOnInit() {
		await this.getDataAsync();
	}

    override async getDataAsync() {
		this._isProcessing = true;		
		await this.userAdminService
			.getByPageAsync('first-name', 'asc', 10, 1, '')
			.then(p => {
				// this.errors = [];
				this._pageData = p;
				// this.updatePage(p);
			})
			.catch(e => {
				// this.errors = Utils.getErrorsResponse(e);	
			});
		this._isProcessing = false;
    }
}
