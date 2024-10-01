import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from '../../../../source/models/dtos/entities/user-response';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { PageBase } from '../../../../source/common/page-base';
import { INavigationOptionSelected } from '../../../../source/models/interfaces/page.interface';
import { Utils } from '../../../../source/common/utils';
import { UserUsersService } from '../../../../services/business/user-users.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.css'
})
export class UsersListComponent extends PageBase<UserResponse> implements OnInit {
   
    constructor(
        private userUsersService: UserUsersService,
		private router: Router,
		localStorageService: LocalStorageService
    ) {
        super('users', localStorageService);
    }  

    async ngOnInit() {
		await this.getDataAsync();
	}

    override async getDataAsync() {
		this._error = null;
		this._isProcessing = true;		
		await this.userUsersService
			.getUsersByPageAsync(this._pageOrderSelected.data, this._pageOrderSelected.isAscending ? 'asc' : 'desc', this.pageSize, this.pageNumber, '')
			.then(p => {
				this._pageData = p;
				this.updatePage(p);
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);				
			});
		this._isProcessing = false;
    }

	onChangeRoleClicked(event: Event, user: UserResponse) {
		this.router.navigateByUrl(`/users/change-role/${user.id}/${user.email}/${user.userRole}`);
	}

	onUpdatePersonalDataClicked($event: MouseEvent,user: UserResponse) {
		this.router.navigateByUrl(`user/personal-data/${user.id}`);
	}
	
	isUserInAnyRole(roles: string[]) {
		return this.localStorageService.isUserInAnyRole(roles);
	}

	override onCreateClicked(event: Event): void {
		throw new Error('Method not implemented.');
	}
}
