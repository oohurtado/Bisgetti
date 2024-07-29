import { Component, OnInit } from '@angular/core';
import { MenuResponse } from '../../../../../source/models/business/responses/menu-response';
import { PageBase } from '../../../../../source/page-base';
import { MenuStuffService } from '../../../../../services/business/menu-stuff.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../../services/common/local-storage.service';
import { Utils } from '../../../../../source/utils';
declare let alertify: any;

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

	override onCreateClicked(event: Event): void {
		this.router.navigateByUrl(`/menu-stuff/menus/create`);
	}

	onDeleteClicked(event: Event, menu: MenuResponse) {
		let button = event.target as HTMLButtonElement;
        button.blur();

		let message: string = `
			¿Estás seguro de querer borrar el menú: <b>${menu.name}</b>?
			<br>
			<small><strong>Ten en cuenta lo siguiente:</strong> Las categorías y productos agregados al menú no serán borrados.</small>
			`;

		let component = this;
		alertify.confirm("Confirmar eliminación", message,
			function () {
				component._isProcessing = true;
				component.menuStuffService.deleteMenu(menu.id)
					.subscribe({
						complete: () => {
							component._isProcessing = false;
						},
						error: (e : string) => {
							component._isProcessing = false;
							component._error = Utils.getErrorsResponse(e);					
						},
						next: (val) => {							
							component._pageData.data = component._pageData.data.filter(p => p.id != menu.id);
							alertify.message("Menú borrado", 1)
						}
					});				
			},
			function () {
				// ...
			});		
	}

    onBuilderClicked(event: Event, menu: MenuResponse) {
		this.router.navigateByUrl(`/menu-stuff/menus/builder/${menu.id}`);
	}

	onPreviewClicked(event: Event, menu: MenuResponse) {
		this.router.navigateByUrl(`/menu-stuff/menus/preview/${menu.id}`);
	}
}
