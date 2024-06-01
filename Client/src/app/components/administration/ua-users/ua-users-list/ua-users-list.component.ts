import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from '../../../../source/models/dtos/user/common/user-response';
import { UserAdministrationService } from '../../../../services/business/user/user-administration.service';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { ListBase } from '../../../../source/list-base';
import { INavigationOptionSelected } from '../../../../source/models/interfaces/page.interface';

@Component({
    selector: 'app-ua-users-list',
    templateUrl: './ua-users-list.component.html',
    styleUrl: './ua-users-list.component.css'
})
export class UaUsersListComponent extends ListBase<UserResponse> implements OnInit {
    
    constructor(
        private userAdministrationService: UserAdministrationService,
		private router: Router,
		localStorageService: LocalStorageService
    ) {
        super('admin-users', localStorageService);
    }  

    async ngOnInit() {
		await this.getDataAsync();
	}

    override async getDataAsync() {
		this._isProcessing = true;		
		await this.userAdministrationService
			.getByPageAsync(this._pageOrderSelected.data, this._pageOrderSelected.isAscending ? 'asc' : 'desc', this.pageSize, this.pageNumber, '')
			.then(p => {
				// this.errors = [];
				this._pageData = p;
				this.updatePage(p);
			})
			.catch(e => {
				// this.errors = Utils.getErrorsResponse(e);	
			});
		this._isProcessing = false;
    }

	override onCreateClicked(optionSelected: INavigationOptionSelected): void {	
		this.router.navigateByUrl(`/ua/users/create-user`);
	}

	override onBackClicked(): void {
		throw new Error('Method not implemented.');
	}
	
	override onHomeClicked(): void {
		this.router.navigateByUrl(`/home`);
	}

	onChangeRoleClicked(event: Event, id: string) {
		this.router.navigateByUrl(`/ua/users/change-role/${id}`);
	}
}
