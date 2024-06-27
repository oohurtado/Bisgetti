import { Component, OnInit } from '@angular/core';
import { MenuResponse } from '../../../../../source/models/business/menu-response';
import { PageBase } from '../../../../../source/page-base';
import { MenuStuffService } from '../../../../../services/business/menu-stuff.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../../services/common/local-storage.service';
import { Utils } from '../../../../../source/utils';

@Component({
    selector: 'app-menus-list',
    templateUrl: './menus-list.component.html',
    styleUrl: './menus-list.component.css'
})
export class MenusListComponent extends PageBase<MenuResponse> implements OnInit {
    
    constructor(
        private menuStuffService: MenuStuffService,
		private router: Router,
		localStorageService: LocalStorageService
    ) {
        super('menus', localStorageService);
    }  

    async ngOnInit() {
		await this.getDataAsync();
	}

    override async getDataAsync() {
		this._error = null;
		this._isProcessing = true;		
		await this.menuStuffService
			.getMenusByPageAsync(this._pageOrderSelected.data, this._pageOrderSelected.isAscending ? 'asc' : 'desc', this.pageSize, this.pageNumber, '')
			.then(p => {
				this._pageData = p;
				this.updatePage(p);
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);				
			});
		this._isProcessing = false;
    }

    onUpdateClicked(event: Event, menu: MenuResponse) {
		this.router.navigateByUrl(`/menu-stuff/menus/update/${menu.id}`);
	}
}
